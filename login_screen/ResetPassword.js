import React, { useState } from "react";
import { Formik } from "formik";
import { ActivityIndicator } from "react-native";
import { colors } from "../components/colors";
const { primary } = colors;

// Custom components
import MainContainer from "../components/Containers/MainContainer";
import KeyboardAvoidingContainer from "../components/Containers/KeyboardAvoidingContainer";
import RegularText from "../components/Texts/RegularText";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import MsgBox from "../components/Texts/MsgBox";
import RegularButton from "../components/Buttons/RegularButton";
import IconHeader from "../components/Icons/IconHeader";
import StyledCodeInput from "../components/Inputs/StyledCodeInput";
import ResendTimer from "../components/Timers/ResendTimer";
import styled from "styled-components/native";
import MessageModal from "../components/Modals/MessageModal";

const FormWrapper = styled.View`
  ${(props) => (props.pinReady ? `opacity: 1` : `opacity: 0.3`)};
`;

const ResetPassword = ({navigation}) => {
  const [message, setMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  // Code input
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false); // ✅ Fix: Set initial state as boolean

  // Resending email
  const [activeResend, setActiveResend] = useState(false);
  const [resendStatus, setResendStatus] = useState("Resend");
  const [resendingEmail, setResendingEmail] = useState(false);

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState("");
  const [headerText, setHeaderText] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [buttonText, setButtonText] = useState("");

  const moveTo = (screen, payload) => {
    navigation.navigate(screen, { ...payload});
};


  const buttonHandler = () => {
    if (modalMessageType === "success") {
      // Do something on success
      moveTo('Login');
    }
    setModalVisible(false);
  };

  const showModal = (type, header, message, button) => {
    setModalMessageType(type);
    setHeaderText(header);
    setModalMessage(message);
    setButtonText(button);
    setModalVisible(true);
  };

  const handleOnSubmit = async (credentials, setSubmitting) => {
    try {
      setMessage(null);
      // Call backend API for password reset
      // Move to the next page if successful
      setSubmitting(false);
      return showModal('success', 'All Good!', 'Your password has been reset. ','Proceed' );
    } catch (error) {
      setSubmitting(false);
      return showModal('failed', 'failed', 'error.message','Close' );
    }
  };

  const resendEmail = async (triggerTimer) => {
    try {
      setResendingEmail(true);
      // Make request to backend

      setResendingEmail(false);

      // Hold on briefly
      setTimeout(() => {
        setResendStatus("Resend");
        setActiveResend(false);
        triggerTimer();
      }, 5000);
    } catch (error) {
      setResendingEmail(false);
      setResendStatus("Failed!");
      alert("Email Resend Failed: " + error.message);
    }
  };

  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <RegularText style={{ marginBottom: 25, textAlign: "center" }}>
          Enter the 4-digit code sent to your email
        </RegularText>

        <StyledCodeInput
          code={code}
          SetCode={setCode}
          maxLength={MAX_CODE_LENGTH}
          setPinReady={setPinReady} // ✅ Ensuring `setPinReady` gets a boolean
        />

        <ResendTimer
          activeResend={activeResend}
          setActiveResend={setActiveResend}
          resendStatus={resendStatus}
          resendingEmail={resendingEmail}
          resendEmail={resendEmail}
          style={{ marginBottom: 25 }}
        />

        <Formik
          initialValues={{ newPassword: "", confirmNewPassword: "" }}
          onSubmit={(values, { setSubmitting }) => {
            if (values.newPassword === "" || values.confirmNewPassword === "") {
              setMessage("Please fill in all fields");
              setSubmitting(false);
            } else if (values.newPassword !== values.confirmNewPassword) {
              setMessage("Passwords do not match");
              setSubmitting(false);
            } else {
              handleOnSubmit(values, setSubmitting);
            }
          }}
        >
          {({ handleChange, handleSubmit, handleBlur, values, isSubmitting }) => (
            <FormWrapper pinReady={pinReady}>
              <StyledTextInput
                label="New Password"
                icon="lock-open-variant"
                placeholder="* * * * * *"
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                value={values.newPassword}
                isPassword={true}
                style={{ marginBottom: 25 }}
                editable={pinReady}
              />

              <StyledTextInput
                label="Confirm New Password"
                icon="lock-open-variant"
                placeholder="* * * * * *"
                onChangeText={handleChange("confirmNewPassword")}
                onBlur={handleBlur("confirmNewPassword")}
                value={values.confirmNewPassword}
                isPassword={true}
                style={{ marginBottom: 25 }}
                editable={pinReady}
              />

              <MsgBox style={{ marginBottom: 40 }} success={isSuccessMessage}>
                {message || " "}
              </MsgBox>

              {!isSubmitting && (
                <RegularButton disabled={!pinReady} onPress={handleSubmit}>
                  Submit
                </RegularButton>
              )}

              {isSubmitting && (
                <RegularButton disabled={true}>
                  <ActivityIndicator size="small" color={primary} />
                </RegularButton>
              )}
            </FormWrapper>
          )}
        </Formik>

        <MessageModal
          modalVisible={modalVisible}
          buttonHandler={buttonHandler}
          type={modalMessageType}
          headerText={headerText}
          message={modalMessage}
          buttonText={buttonText}
        />
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

export default ResetPassword;
