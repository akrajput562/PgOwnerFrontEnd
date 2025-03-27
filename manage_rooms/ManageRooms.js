import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Picker, StyleSheet } from 'react-native';

const ManageRooms = () => {
  const [floor, setFloor] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [numBeds, setNumBeds] = useState(1);
  const [rooms, setRooms] = useState([]);

  const floors = ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor'];

  const addRoom = () => {
    if (floor && roomNumber && numBeds) {
      const newRoom = {
        id: Date.now().toString(),
        floor,
        roomNumber,
        numBeds,
        tenants: []
      };
      setRooms([...rooms, newRoom]);
      setFloor('');
      setRoomNumber('');
      setNumBeds(1);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.roomItem}>
      <Text>{item.floor} - Room {item.roomNumber}</Text>
      <Text>{'🛏'.repeat(item.numBeds)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={floor}
        onValueChange={(itemValue) => setFloor(itemValue)}
        style={styles.picker}
      >
        {floors.map((f, i) => (
          <Picker.Item key={i} label={f} value={f} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Room Number"
        value={roomNumber}
        onChangeText={setRoomNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Beds"
        value={numBeds.toString()}
        onChangeText={(text) => setNumBeds(Number(text))}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton} onPress={addRoom}>
        <Text style={styles.buttonText}>Add Room</Text>
      </TouchableOpacity>

      <FlatList
        data={rooms}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.roomList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  roomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  roomList: {
    marginTop: 20,
  },
});

export default ManageRooms;
