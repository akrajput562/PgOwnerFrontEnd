import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import storageService from './storageService';

const FloorManagement = () => {
  const [floorNumber, setFloorNumber] = useState('');
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    const loadFloors = async () => {
      const data = await storageService.loadData();
      if (data && data.floors) {
        setFloors(data.floors);
      }
    };
    loadFloors();
  }, []);

  const saveAllData = async (newFloors) => {
    const currentData = await storageService.loadData();
    await storageService.saveData({ ...currentData, floors: newFloors });
  };

  const handleAddFloor = async () => {
    if (floorNumber) {
      const newFloors = [...floors, { id: Date.now().toString(), number: floorNumber }];
      setFloors(newFloors);
      setFloorNumber('');
      await saveAllData(newFloors);
    }
  };

  const handleEditFloor = async (id, newNumber) => {
    const updatedFloors = floors.map(floor => 
      floor.id === id ? { ...floor, number: newNumber } : floor
    );
    setFloors(updatedFloors);
    await saveAllData(updatedFloors);
  };

  const handleDeleteFloor = async (id) => {
    const updatedFloors = floors.filter(floor => floor.id !== id);
    setFloors(updatedFloors);
    await saveAllData(updatedFloors);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Floor Number"
        value={floorNumber}
        onChangeText={setFloorNumber}
        keyboardType="numeric"
      />
      <Button title="Add Floor" onPress={handleAddFloor} />

      <FlatList
        data={floors}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.floorItem}>
            <Text>Floor {item.number}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditFloor(item.id, prompt('Enter new floor number', item.number))}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteFloor(item.id)}>
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
  floorItem: {
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

export default FloorManagement;
