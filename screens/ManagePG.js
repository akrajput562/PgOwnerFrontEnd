import React, { useState } from 'react';
import { View, FlatList, Text, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Dummy data for properties. Replace with API data as needed.
const dummyProperties = [
  {
    id: '1',
    name: 'PG Sunshine',
    rooms: [
      { roomNo: 101, vacant: false, beds: [ { bedNo: 1, vacant: false }, { bedNo: 2, vacant: true } ] },
      { roomNo: 102, vacant: true, beds: [ { bedNo: 1, vacant: true } ] }
    ]
  },
  {
    id: '2',
    name: 'PG Greenfield',
    rooms: [
      { roomNo: 201, vacant: true, beds: [ { bedNo: 1, vacant: true }, { bedNo: 2, vacant: true } ] },
      { roomNo: 202, vacant: false, beds: [ { bedNo: 1, vacant: false } ] }
    ]
  }
];

export default function ManagePG() {
  const navigation = useNavigation();
  // Always use dummyProperties for frontend testing
  const [properties] = useState(dummyProperties);

  const handleUpdate = (property) => {
    navigation.navigate('UpdateProperty', { property });
  };

  // Tab bar for navigation
  const tabs = [
    { label: 'Dashboard', screen: 'Dashboard' },
    { label: 'Tenants', screen: 'TenantRequests' },
    { label: 'Rooms', screen: 'Rooms' },
    { label: 'Reports', screen: 'Reports' },
    { label: 'Manage PG', screen: 'ManagePG' }
  ];

  return (
    <View style={{ flex: 1, padding: 0 }}>
      <Image
        source={require('../assets/pgok-logo.png')}
        style={{ width: 80, height: 80, alignSelf: 'center', marginTop: 16, marginBottom: 8 }}
        resizeMode="contain"
      />
      <View style={{ flexDirection: 'row', backgroundColor: '#e0e0e0', paddingVertical: 8 }}>
        {tabs.map(tab => (
          <Text
            key={tab.screen}
            onPress={() => {
              if (tab.screen !== 'ManagePG') navigation.navigate(tab.screen);
            }}
            style={{
              flex: 1,
              textAlign: 'center',
              paddingVertical: 8,
              fontWeight: tab.screen === 'ManagePG' ? 'bold' : 'normal',
              borderBottomWidth: tab.screen === 'ManagePG' ? 3 : 1,
              borderBottomColor: tab.screen === 'ManagePG' ? '#1976d2' : '#bdbdbd',
              color: tab.screen === 'ManagePG' ? '#1976d2' : '#333',
              backgroundColor: tab.screen === 'ManagePG' ? '#fff' : '#e0e0e0'
            }}
          >
            {tab.label}
          </Text>
        ))}
      </View>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Manage PG Properties</Text>
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20, padding: 16, backgroundColor: '#f2f2f2', borderRadius: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>Rooms: {item.rooms.length}</Text>
            {item.rooms.map((room) => (
              <View key={room.roomNo} style={{ marginLeft: 10, marginBottom: 5 }}>
                <Text>Room {room.roomNo} - {room.vacant ? 'Vacant' : 'Occupied'}</Text>
                <Text>Beds: {room.beds.map(bed => `${bed.bedNo} (${bed.vacant ? 'Vacant' : 'Occupied'})`).join(', ')}</Text>
              </View>
            ))}
            <Button title="Update Property" onPress={() => handleUpdate(item)} />
          </View>
        )}
      />
      </View>
    </View>
  );
}
