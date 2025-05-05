import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../components/colors";
const { primary, secondary, lightGray } = colors;
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MainContainer from "../components/Containers/MainContainer";
import KeyboardAvoidingContainer from "../components/Containers/KeyboardAvoidingContainer";
import RegularText from "../components/Texts/RegularText";
import RegularButton from "../components/Buttons/RegularButton";
import IconHeader from "../components/Icons/IconHeader";
import StyledCodeInput from "../components/Inputs/StyledCodeInput";
import ResendTimer from "../components/Timers/ResendTimer";
import MessageModal from "../components/Modals/MessageModal";
import apiClient from "../api/auth";

const EmailVerification = ({ navigation, route }) => {
    // ✅ Get user from navigation params
    const { user } = route.params || {}; 

    // State to store user ID
    const [userId, setUserId] = useState('');

    // OTP input
    const MAX_CODE_LENGTH = 4;
    const [code, setCode] = useState('');
    const [pinReady, setPinReady] = useState(false);
    const [verifying, setVerifying] = useState(false);

    // Resending OTP
    const [activeResend, setActiveResend] = useState(false);
    const [resendStatus, setResendStatus] = useState('Resend');
    const [resendingEmail, setResendingEmail] = useState(false);

    // Modal state
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessageType, setModalMessageType] = useState('');
    const [headerText, setHeaderText] = useState('');
    const [ModalMessage, setModalMessage] = useState('');
    const [buttonText, setButtonText] = useState('');

    // Get userId from AsyncStorage
    useEffect(() => {
        const getUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('user_id');
                setUserId(id);
            } catch (error) {
                console.log('Error retrieving userId:', error);
            }
        };
        getUserId();
    }, []);

    const moveTo = (screen, payload) => {
        navigation.navigate(screen, { ...payload });
    };

    const buttonHandler = () => {
        if (modalMessageType === 'success') {
            moveTo("Dashboard");
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

    const resendEmail = async (triggerTimer) => {
        try {
            setResendingEmail(true);
            // TODO: Call your API to resend OTP here
            
            setResendStatus('Sent');
            setResendingEmail(false);

            // Trigger the resend timer
            setTimeout(() => {
                setResendStatus('Resend');
                setActiveResend(false);
                triggerTimer();
            }, 5000);
        } catch (error) {
            setResendingEmail(false);
            setResendStatus('Failed!');
            alert('Email Resend Failed: ' + error.message);
        }
    };
    //const API_BASE_URL = 'http://localhost:8080/pg';
    const API_BASE_URL='http://192.168.29.66:8080/pg'
    const handleEmailVerification = async () => {
        try {
            setVerifying(true);
            const formData = new FormData();
            Object.keys(user).forEach(key => {
                formData.append(key, user[key]); // Add user details
        
            });
            formData.append("otp", code); // Add OTP separately
  
          
            console.log(formData)

            // Send request
            const data = await axios({
                method: 'POST',
                url: `${API_BASE_URL}/pg/verifyOtp?otp=${code}`, // Since backend expects otp as query param
                data: user, // Use plain object, not FormData
                headers: {
                    'Content-Type': 'application/json', // Backend expects JSON
                },
            });

            if (data.status === 200) {
                setVerifying(true);
                return showModal('success', 'All Good!', 'Your email has been verified.', 'Proceed');
                moveTo('Dashboard');
            } else {
                setVerifying(false);
                return showModal('failed', 'Verification Failed', data.message || 'Invalid code', 'Close');
            }
        } catch (error) {
            setVerifying(false);
            return showModal('failed', 'Verification Failed', error.message || 'Something went wrong', 'Close');
        }
    };

    return (
        <MainContainer>
            <KeyboardAvoidingContainer>
                <IconHeader name="lock-open" style={{ marginBottom: 30 }} />
                <RegularText style={{ marginBottom: 25, textAlign: 'center' }}>
                    Enter the 4-digit code sent to your email
                </RegularText>

                <StyledCodeInput code={code} SetCode={setCode} maxLength={MAX_CODE_LENGTH} setPinReady={setPinReady} />

                {!verifying && pinReady && <RegularButton onPress={handleEmailVerification}>Verify</RegularButton>}
                {!verifying && !pinReady && (
                    <RegularButton disabled={true} style={{ backgroundColor: secondary }} textStyle={{ color: lightGray }}>
                        Verify
                    </RegularButton>
                )}

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

                <MessageModal
                    modalVisible={modalVisible}
                    buttonHandler={buttonHandler}
                    type={modalMessageType}
                    headerText={headerText}
                    message={ModalMessage}
                    buttonText={buttonText}
                />
            </KeyboardAvoidingContainer>
        </MainContainer>
    );
};

export default EmailVerification;
