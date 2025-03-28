import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FloorManagement from './FloorManagement';
import RoomManagement from './RoomManagement';

const Stack = createStackNavigator();

const PropertyNavigation = () => (
  <Stack.Navigator initialRouteName="FloorManagement">
    <Stack.Screen 
      name="FloorManagement" 
      component={FloorManagement} 
      options={{ title: 'Manage Floors' }}
    />
    <Stack.Screen
      name="RoomManagement"
      component={RoomManagement}
      options={({ route }) => ({ title: `Manage Rooms - Floor ${route.params?.floorNumber || ''}` })}
    />
  </Stack.Navigator>
);

export default PropertyNavigation;
