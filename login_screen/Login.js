import React, {useState} from "react";
import { Formik } from "formik";
import { ActivityIndicator } from "react-native";
import { colors } from "../components/colors";
const { primary } = colors;
import AsyncStorage from '@react-native-async-storage/async-storage';
//custom component 
import MainContainer from "../components/Containers/MainContainer";
import KeyboardAvoidingContainer from "../components/Containers/KeyboardAvoidingContainer";
import RegularText from "../components/Texts/RegularText";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import MsgBox from "../components/Texts/MsgBox";
import RegularButton from "../components/Buttons/RegularButton";
import PressableText from "../components/Texts/PressableText";
import RowContainer from "../components/Containers/RowContainer";
import apiClient from "../api/auth";
import {JwtDecode} from '../api/JwtDecode'
import { decodeJWT } from '../api/JwtDecode';
const Login = ({navigation}) =>{
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    const moveTo = (screen, payload) => {
        navigation.navigate(screen, { ...payload});
    };
    




    const handleLogin = async (credentials, setSubmitting) => {
        try {
            setMessage(null);
            const formData = new FormData();
            Object.keys(credentials).forEach(key => {
                formData.append(key, credentials[key]);
            });
    
            // Call backend API
            const data = await apiClient('/user/login', 'POST', formData);
            const token = data.authToken;
          //  const userId = getUserIdFromToken(token);
            if (token) {
                // Store token in AsyncStorage
                await AsyncStorage.setItem('authToken', token);
                const jwtToken =token;
                const decodedPayload = decodeJWT(jwtToken);
                console.log(decodedPayload);
               //  await AsyncStorage.setItem('userID',decodedPayload.user_id); 
               //  await AsyncStorage.setItem('role_id',decodedPayload.roles[0]); 
                moveTo('Dashboard');
                console.log('Sign in successful:', data);
            } else {
                setMessage('Login failed: Invalid credentials');
            }
           
          setSubmitting(true);
        }catch (error) {
            setMessage('Login failed: ' + error.message);
            setSubmitting(false);
        }
    };

    return (
    <MainContainer>
        <KeyboardAvoidingContainer>
            <RegularText style={{marginBottom: 25}}>Enter your account credentials</RegularText>

            <Formik 
            initialValues={{username: '', password: '' }}
            onSubmit={(values, {setSubmitting}) => {
                if (values.username == "" || values.password == ""){
                    setMessage('Please fill in all fields');
                    setSubmitting(false);
                } else{
                    handleLogin(values, setSubmitting);
                }
            }}
            >
                {({handleChange, handleSubmit, handleBlur, values, isSubmitting}) => (
                    <>
                        <StyledTextInput 
                        label="Email Address" 
                        icon="email-variant" 
                        placeholder="walt@gmail.com" 
                        keyboardType="email-address" 
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        style={{ marginBottom: 25}}
                        />

                        <StyledTextInput 
                        label="Password" 
                        icon="lock-open" 
                        placeholder="* * * * * *" 
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        isPassword={true}
                        style={{ marginBottom: 25}}
                        />

                        <MsgBox style={{ marginBottom: 25}} success={isSuccessMessage}>
                            { message || " "}
                            </MsgBox>
                        {!isSubmitting && <RegularButton onPress={handleSubmit}>Login</RegularButton>}
                        {isSubmitting && (
                        <RegularButton disabled={true}>
                          <ActivityIndicator size="small" color={primary} /> 
                        </RegularButton>
                        )}
                        <RowContainer>
                        <PressableText onPress={() =>{moveTo('Signup')}}>New account sign up</PressableText>
                        <PressableText onPress={() =>{moveTo('ForgotPassword')}}>Forgot Password</PressableText>
                        </RowContainer>
                        
                        
                    </>
                )}
            </Formik>   
        </KeyboardAvoidingContainer>
    </MainContainer>
    );
};

export default Login;