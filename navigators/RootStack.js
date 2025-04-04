import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { colors } from "../components/colors";
const { accent, secondary } = colors;

//screen
import Login from '../login_screen/Login';
import Signup from '../login_screen/Signup';
import EmailVerification from "../login_screen/EmailVerification";
import ForgotPassword from "../login_screen/ForgotPassword";
import ResetPassword from "../login_screen/ResetPassword";
import Dashboard from "../login_screen/Dashboard";
import PgRegistration from '../login_screen/PgRegistration';
import PropertyNavigation from '../pgregistration/PropertyNavigation';
import SuccessMessage from '../login_screen/PgRegistration';
import AddTenant from '../tenants/Addtenant';
import Rooms from '../screens/Rooms';
import RoomDetails from '../screens/RoomDetails';
import PgListScreen from '../pgregistration/PgListScreen';  // New screen added
import Reports from '../screens/Reports';  // Add this import
import ProfileScreen from '../screens/ProfileScreen';  // Import ProfileScreen

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTintColor: accent,
                    headerStyle: {
                        height: 100,
                        backgroundColor: secondary,
                        borderBottomWidth: 0,
                        shadowColor: 'transparent',
                        shadowOpacity: 0,
                        elevation: 0
                    },
                    headerLeftContainerStyle: {
                        paddingLeft: 10
                    },
                    headerRightContainerStyle: {
                        paddingRight: 25
                    },
                }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen
                    name="EmailVerification"
                    component={EmailVerification}
                    options={{ headerTitle: 'Email Verification' }}
                />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerTitle: 'Forgot Password' }} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerTitle: 'Reset Password' }} />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                        headerShown: false,
                        gestureEnabled: false
                    }}
                />
                <Stack.Screen
                    name="PgRegistration"
                    component={PgRegistration}
                    options={{
                        title: 'PG Registration',
                        headerStyle: {
                            backgroundColor: '#ffffff',
                            elevation: 0,
                            shadowOpacity: 0
                        },
                        headerTintColor: '#000000',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }}
                />
                <Stack.Screen name="SuccessMessage" component={SuccessMessage} options={{ headerShown: false }} />
                <Stack.Screen name="Property" component={PropertyNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="AddTenant" component={AddTenant} options={{ title: 'Add Tenant' }} />
                <Stack.Screen
                    name="Rooms"
                    component={Rooms}
                    options={{
                        title: 'Rooms',
                        headerStyle: {
                            backgroundColor: '#ffffff',
                            elevation: 0,
                            shadowOpacity: 0
                        },
                        headerTintColor: '#000000',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }}
                />
                <Stack.Screen
                    name="RoomDetails"
                    component={RoomDetails}
                    options={{
                        title: 'Room Details',
                        headerStyle: {
                            backgroundColor: '#ffffff',
                            elevation: 0,
                            shadowOpacity: 0
                        },
                        headerTintColor: '#000000',
                        headerTitleStyle: {
                            fontWeight: 'bold'
                        }
                    }}
                />
                {/* Reports Screen */}
                <Stack.Screen
                    name="Reports"
                    component={Reports}
                    options={{
                        headerShown: false
                    }}
                />
                {/* New PgListScreen added to navigation */}
                <Stack.Screen name="PgListScreen" component={PgListScreen} options={{ title: 'PG List' }} />
                {/* Profile Screen */}
                <Stack.Screen 
                    name="ProfileScreen" 
                    component={ProfileScreen} 
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;
