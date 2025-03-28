import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import storageService from './storageService';

const RoomManagement = ({ floors }) => {
  const [selectedFloor, setSelectedFloor] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [bedCount, setBedCount] = useState(1);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      const data = await storageService.loadData();
      if (data && data.rooms) {
        setRooms(data.rooms);
      }
    };
    loadRooms();
  }, []);

  const saveAllData = async (newRooms) => {
    const currentData = await storageService.loadData();
    await storageService.saveData({ ...currentData, rooms: newRooms });
  };

  const handleAddRoom = async () => {
    if (selectedFloor && roomNumber) {
      const newRooms = [...rooms, {
        id: Date.now().toString(),
        floor: selectedFloor,
        number: roomNumber,
        beds: bedCount
      }];
      setRooms(newRooms);
      setRoomNumber('');
      setBedCount(1);
      await saveAllData(newRooms);
    }
  };

  const handleEditRoom = async (id, newNumber, newBeds) => {
    const updatedRooms = rooms.map(room => 
      room.id === id ? { ...room, number: newNumber, beds: newBeds } : room
    );
    setRooms(updatedRooms);
    await saveAllData(updatedRooms);
  };

  const handleDeleteRoom = async (id) => {
    const updatedRooms = rooms.filter(room => room.id !== id);
    setRooms(updatedRooms);
    await saveAllData(updatedRooms);
  };

  const renderBedIcon = (count) => {
    return '🛏'.repeat(count);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedFloor}
        onValueChange={(itemValue) => setSelectedFloor(itemValue)}>
        <Picker.Item label="Select Floor" value="" />
        {floors.map(floor => (
          <Picker.Item key={floor.id} label={`Floor ${floor.number}`} value={floor.number} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Enter Room Number"
        value={roomNumber}
        onChangeText={setRoomNumber}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Beds"
        value={bedCount.toString()}
        onChangeText={(text) => setBedCount(Number(text))}
        keyboardType="numeric"
      />

      <Button title="Add Room" onPress={handleAddRoom} />

      <FlatList
        data={rooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.roomItem}>
            <Text>Floor {item.floor} - Room {item.number} {renderBedIcon(item.beds)}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => {
                const newNumber = prompt('Enter new room number', item.number);
                const newBeds = prompt('Enter new bed count', item.beds);
                handleEditRoom(item.id, newNumber, newBeds);
              }}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteRoom(item.id)}>
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  roomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionText: {
    color: '#007bff',
  },
});

export default RoomManagement;
