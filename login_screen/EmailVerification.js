import React, {useState} from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../components/colors";
const { primary, secondary, lightGray } = colors;

//custom component 
import MainContainer from "../components/Containers/MainContainer";
import KeyboardAvoidingContainer from "../components/Containers/KeyboardAvoidingContainer";
import RegularText from "../components/Texts/RegularText";
import RegularButton from "../components/Buttons/RegularButton";
import IconHeader from "../components/Icons/IconHeader";
import StyledCodeInput from "../components/Inputs/StyledCodeInput";
import ResendTimer from "../components/Timers/ResendTimer";
import MessageModal from "../components/Modals/MessageModal";

const EmailVerification = ({navigation}) =>{
    //code input
    const MAX_CODE_LENGTH = 4;
    const [code, setCode] = useState('');
    const [pinReady, setPinReady] = useState('');
    const [verifying, setVerifying] = useState(false);

    // resending email
    const [activeResend, setActiveResend] = useState(false);
    const [resendStatus, setResendStatus] = useState('Resend');
    const [resendingEmail, setResendingEmail] = useState(false);

    //MOdal
    
    const [modalVisible, setModalVisible] = useState(false);
    const [ modalMessageType, setModalMessageType] = useState('');
    const [headerText, setHeaderText] = useState('');
    const [ModalMessage, setModalMessage] = useState('');
    const [buttonText, setButtonText] = useState('');

    const moveTo = (screen, payload) => {
        navigation.navigate(screen, { ...payload});
    };

    const buttonHandler = () => {
        if (modalMessageType == 'success') {
            // do something
            moveTo("Dashboard");
        }

        setModalVisible(false);
    };

    const showModal = (type, headerText, message, buttonText) => {
        setModalMessageType(type);
        setHeaderText(headerText);
        setModalMessage(message);
        setButtonText(buttonText);
        setModalVisible(true);
    }

    const resendEmail = async (triggerTimer) => {
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
    };


    const handleEmailVerification = async () => {
        try {

            
            setVerifying(true);

            // call backend

            setVerifying(false);
            return showModal('success', 'All Good!', 'Your email has been verified.','Proceed' );           
        }catch (error) {
            setVerifying(false);
            return showModal('failed', 'failed', 'error.message','Close' );
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