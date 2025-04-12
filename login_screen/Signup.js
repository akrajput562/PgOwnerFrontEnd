import React, { useState,useEffect } from "react";
import { Formik } from "formik";
import { ActivityIndicator } from "react-native";
import { colors } from "../components/colors";
const { primary } = colors;

// Custom components
import MainContainer from '../components/Containers/MainContainer';
import KeyboardAvoidingContainer from "../components/Containers/KeyboardAvoidingContainer";
import RegularText from "../components/Texts/RegularText";
import StyledTextInput from "../components/Inputs/StyledTextInput";
import MsgBox from "../components/Texts/MsgBox";
import RegularButton from "../components/Buttons/RegularButton";
import PressableText from "../components/Texts/PressableText";
import apiClient from "../api/auth";


const Signup = ({ navigation }) => {
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [user, setUser] = useState(null); // Store user data
    const moveTo = (screen, payload) => {
        navigation.navigate(screen, { ...payload });
    };

    const handleSignup = async (credentials, setSubmitting) => {
        try {
            setMessage(null);
    
            // Create FormData for the API request
            const formData = new FormData();
            formData.append("status",1);
            formData.append("role_id",1);
            Object.keys(credentials).forEach(key => {
                formData.append(key, credentials[key]);
            });
    
            // Call backend API
            const data = await apiClient('/user/register', 'POST', formData);
    
            console.log('Signup successful:', data);
    
            setUser(credentials);
    
        } catch (error) {
            setMessage('Signup failed: ' + (error.message || 'Please try again.'));
        } finally {
            setSubmitting(false);
        }
    };
    useEffect(() => {
        if (user) {
            navigation.navigate('EmailVerification', { user });
        }
    }, [user]); 
    return (
        <MainContainer>
            <KeyboardAvoidingContainer>
                <RegularText style={{ marginBottom: 25 }}>
                    Enter your account credentials
                </RegularText>

                <Formik
                    initialValues={{ email: '', username: '', password: '', confirmPassword: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (!values.email || !values.password || !values.username) {
                            setMessage('Please fill in all fields');
                            setSubmitting(false);
                        } else if (values.password !== values.confirmPassword) {
                            setMessage('Passwords do not match');
                            setSubmitting(false);
                        } else {
                            handleSignup(values, setSubmitting);
                        }
                    }}
                >
                    {({ handleChange, handleSubmit, handleBlur, values, isSubmitting }) => (
                        <>
                            <StyledTextInput
                                label="Full Name"
                                icon="account"
                                placeholder="Name"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                style={{ marginBottom: 15 }}
                            />

                            <StyledTextInput
                                label="Email Address"
                                icon="email-variant"
                                placeholder="walt@gmail.com"
                                keyboardType="email-address"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={{ marginBottom: 25 }}
                            />

                            <StyledTextInput
                                label="Password"
                                icon="lock-open"
                                placeholder="* * * * * *"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                isPassword={true}
                                style={{ marginBottom: 25 }}
                            />

                            <StyledTextInput
                                label="Confirm Password"
                                icon="lock-open"
                                placeholder="* * * * * *"
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                isPassword={true}
                                style={{ marginBottom: 15 }}
                            />

                            <MsgBox style={{ marginBottom: 25 }} success={isSuccessMessage}>
                                {message || " "}
                            </MsgBox>

                            {!isSubmitting ? (
                                <RegularButton onPress={handleSubmit}>Signup</RegularButton>
                            ) : (
                                <RegularButton disabled={true}>
                                    <ActivityIndicator size="small" color={primary} />
                                </RegularButton>
                            )}

                            <PressableText style={{ paddingVertical: 15 }} onPress={() => moveTo('Login')}>
                                Sign In to an existing account
                            </PressableText>
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingContainer>
        </MainContainer>
    );
};

export default Signup;
