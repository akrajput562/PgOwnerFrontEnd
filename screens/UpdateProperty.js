import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function UpdateProperty(props) {

  const route = useRoute();
  const navigation = useNavigation();
  const { property } = route.params;

  const [pgName, setPgName] = useState(property.name);
  const [rooms, setRooms] = useState(property.rooms.map(room => ({
    ...room,
    beds: room.beds.map(bed => ({ ...bed }))
  })));

  const handleRoomChange = (idx, key, value) => {
    setRooms(prevRooms => prevRooms.map((room, i) => i === idx ? { ...room, [key]: value } : room));
  };

  const handleBedChange = (roomIdx, bedIdx, key, value) => {
    setRooms(prevRooms => prevRooms.map((room, i) => {
      if (i !== roomIdx) return room;
      return {
        ...room,
        beds: room.beds.map((bed, j) => j === bedIdx ? { ...bed, [key]: value } : bed)
      };
    }));
  };

  const handleSave = () => {
    // Save logic here (API call or local update)
    // For now, just go back
    navigation.goBack();
  };


  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Update Property</Text>
      <Text style={{ marginBottom: 8 }}>PG Name</Text>
      <TextInput
        value={pgName}
        onChangeText={setPgName}
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 16 }}
      />
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Rooms</Text>
      {rooms.map((room, idx) => (
        <View key={room.roomNo} style={{ marginBottom: 16, padding: 10, backgroundColor: '#f5f5f5', borderRadius: 6 }}>
          <Text>Room Number</Text>
          <TextInput
            value={room.roomNo.toString()}
            onChangeText={val => handleRoomChange(idx, 'roomNo', parseInt(val) || 0)}
            keyboardType="numeric"
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 6, marginBottom: 6 }}
          />
          <Text>Vacant:</Text>
          <Button
            title={room.vacant ? 'Vacant' : 'Occupied'}
            color={room.vacant ? 'green' : 'red'}
            onPress={() => handleRoomChange(idx, 'vacant', !room.vacant)}
          />
          <Text style={{ marginTop: 8, fontWeight: 'bold' }}>Beds</Text>
          {room.beds.map((bed, bedIdx) => (
            <View key={bed.bedNo} style={{ marginLeft: 10, marginBottom: 6 }}>
              <Text>Bed Number</Text>
              <TextInput
                value={bed.bedNo.toString()}
                onChangeText={val => handleBedChange(idx, bedIdx, 'bedNo', parseInt(val) || 0)}
                keyboardType="numeric"
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 6, marginBottom: 2 }}
              />
              <Text>Vacant:</Text>
              <Button
                title={bed.vacant ? 'Vacant' : 'Occupied'}
                color={bed.vacant ? 'green' : 'red'}
                onPress={() => handleBedChange(idx, bedIdx, 'vacant', !bed.vacant)}
              />
            </View>
          ))}
        </View>
      ))}
      <Button title="Save Changes" onPress={handleSave} />
    </ScrollView>
  );
}
