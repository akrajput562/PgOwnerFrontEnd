import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

import { colors } from "../components/colors";
import CustomHeader from "../components/CustomHeader";
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

import BedsAvailability from '../screens/BedsAvailability'; // Import BedsAvailability
import TenantRequests from '../screens/TenantRequests';

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerTintColor: '#fff',
                        headerStyle: {
                            height: Platform.OS === 'ios' ? 110 : 100,
                            backgroundColor: '#2196F3',
                            borderBottomWidth: 0,
                            shadowColor: 'transparent',
                            shadowOpacity: 0,
                            elevation: 0
                        },
                        headerTitle: () => <CustomHeader />,
                        headerTitleStyle: {
                            flex: 1,
                            textAlign: 'center',
                            color: '#fff'
                        },
                        headerLeft: () => null,
                        headerRight: () => null,
                        headerShown: true,
                        headerTransparent: false,
                        headerLeftContainerStyle: {
                            paddingLeft: 0,
                            marginTop: 0
                        },
                        headerRightContainerStyle: {
                            paddingRight: 0,
                            marginTop: 0
                        },
                        headerTitleContainerStyle: {
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }}
                    initialRouteName="Login"
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen
                        name="EmailVerification"
                        component={EmailVerification}
                    />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name="ResetPassword" component={ResetPassword} />
                    <Stack.Screen
                        name="Dashboard"
                        component={Dashboard}
                        options={{
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
                    {/* Edit Profile Screen */}
                   
                    {/* Beds Availability Screen */}
                    <Stack.Screen 
                        name="BedsAvailability" 
                        component={BedsAvailability} 
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="TenantRequests"
                        component={TenantRequests}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default RootStack;
