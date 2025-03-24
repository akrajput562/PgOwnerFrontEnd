import React, {useState} from "react";
import { Formik } from "formik";
import { ActivityIndicator } from "react-native";
import { colors } from "../components/colors";
const { primary, secondary, lightGray } = colors;

//custom component 
import MainContainer from "../components/Containers/MainContainer";
import KeyboardAvoidingContainer from "../components/Containers/KeyboardAvoidingContainer";
import RegularText from "../components/Texts/RegularText";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import MsgBox from "../components/Texts/MsgBox";
import RegularButton from "../components/Buttons/RegularButton";
import PressableText from "../components/Texts/PressableText";
import RowContainer from "../components/Containers/RowContainer";
import IconHeader from "../components/Icons/IconHeader";
import StyledCodeInput from "../components/Inputs/StyledCodeInput";
import ResendTimer from "../components/Timers/ResendTimer";

const EmailVerification = () =>{
    //code input
    const MAX_CODE_LENGTH = 4;
    const [code, setCode] = useState('');
    const [pinReady, setPinReady] = useState('');


    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    const [verifying, setVerifying] = useState(false);

    // resending email
    const [activeResend, setActiveResend] = useState(false);
    const [resendStatus, setResendStatus] = useState('Resend');
    const [resendingEmail, setResendingEmail] = useState(false);

    const resendEmail = async () => {
        try {
            setResendingEmail(true);

            // make request to backend

            //setResendStatus() to failed or sent

            setResendingEmail(false);

            // hold on briefly
            setTimeout(()=> {
                setResendStatus('Resend');
                setActiveResend(false);
                triggerTimer();
            }, 5000);
        }catch (error) {
            setResendingEmail(false);
            setResendStatus('Failed!');
            alert('Email Resend Failed: ' + error.message);

        }

    }


    const handleEmailVerification = async (credentials, setSubmitting) => {
        try {
            setMessage(null);

            // call backend

            // move to next page

          setSubmitting(false);
        }catch (error) {
            setMessage('Login failed: ' + error.message);
            setSubmitting(false);
        }
    };


    return (
    <MainContainer>
        <KeyboardAvoidingContainer>
        <IconHeader name="lock-open" style={{marginBotton: 30}}/> 
            <RegularText style={{marginBottom: 25, textAlign: 'center' }}>
                Enter the 4-digits code sent to your email
                </RegularText>

                <StyledCodeInput code={code} SetCode={setCode} maxLength={MAX_CODE_LENGTH} setPinReady={setPinReady} />

                {!verifying && pinReady && <RegularButton onPress={handleEmailVerification}>Verify</RegularButton>}
                {!verifying && !pinReady && (
                    <RegularButton disabled={true} style={{backgroundColor: secondary}} textStyle={{color: lightGray}}>
                        Verify
                        </RegularButton>)}
                        
                        
                        {verifying && (
                        <RegularButton disabled={true}>
                          <ActivityIndicator size="small" color={primary} /> 
                        </RegularButton>
                        )}

                        <ResendTimer 
                        activeResend={activeResend} 
                        setActiveResend={setActiveResend} 
                        resendStatus={resendStatus} 
                        resendingEmail={resendingEmail}
                        resendEmail={resendEmail}
                        
                        />

        </KeyboardAvoidingContainer>
    </MainContainer>
    );
};

export default EmailVerification;