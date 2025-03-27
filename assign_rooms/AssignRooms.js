import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AssignRooms = ({ rooms, setRooms }) => {
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [tenantContact, setTenantContact] = useState('');
  const [moveInDate, setMoveInDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [lastAssignedTenant, setLastAssignedTenant] = useState(null);

  const floors = ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor'];

  useEffect(() => {
    if (selectedFloor) {
      setFilteredRooms(rooms.filter(room => room.floor === selectedFloor));
    }
  }, [selectedFloor, rooms]);

  const assignRoom = () => {
    if (selectedRoom && tenantName && tenantContact && moveInDate) {
      const tenant = {
        id: Date.now().toString(),
        name: tenantName,
        contact: tenantContact,
        moveInDate: moveInDate.toISOString()
      };
      const updatedRooms = rooms.map(room => {
        if (room.id === selectedRoom) {
          return {
            ...room,
            tenants: [
              ...room.tenants,
              tenant
            ]
          };
        }
        return room;
      });
      setRooms(updatedRooms);
      setLastAssignedTenant(tenant);
      setTenantName('');
      setTenantContact('');
      setMoveInDate(new Date());
      setSelectedRoom('');
    }
  };

  const renderProfilePreview = () => {
    if (!lastAssignedTenant) return null;
    return (
      <View style={styles.profilePreview}>
        <Text style={styles.profileTitle}>Tenant Assigned Successfully</Text>
        <Text>Name: {lastAssignedTenant.name}</Text>
        <Text>Contact: {lastAssignedTenant.contact}</Text>
        <Text>Move-in Date: {new Date(lastAssignedTenant.moveInDate).toDateString()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedFloor}
        onValueChange={(value) => {
          setSelectedFloor(value);
          setSelectedRoom('');
        }}
        style={styles.picker}
      >
        {floors.map((floor, index) => (
          <Picker.Item key={index} label={floor} value={floor} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedRoom}
        onValueChange={setSelectedRoom}
        style={styles.picker}
        enabled={!!selectedFloor}
      >
        <Picker.Item label="Select Room" value="" />
        {filteredRooms.map(room => (
          <Picker.Item 
            key={room.id} 
            label={`Room ${room.roomNumber} (${room.tenants.length}/${room.numBeds} beds)`}
            value={room.id}
          />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Tenant Name"
        value={tenantName}
        onChangeText={setTenantName}
      />

      <TextInput
        style={styles.input}
        placeholder="Tenant Contact"
        value={tenantContact}
        onChangeText={setTenantContact}
        keyboardType="phone-pad"
      />

      <TouchableOpacity 
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>Move-in Date: {moveInDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={moveInDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            date && setMoveInDate(date);
          }}
        />
      )}

      <TouchableOpacity 
        style={styles.assignButton} 
        onPress={assignRoom}
        disabled={!selectedRoom || !tenantName || !tenantContact}
      >
        <Text style={styles.buttonText}>Assign Room</Text>
      </TouchableOpacity>
      {renderProfilePreview()}
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
  datePickerButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 5,
  },
  assignButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profilePreview: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  profileTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AssignRooms;
