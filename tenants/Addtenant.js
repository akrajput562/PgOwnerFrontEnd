import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Entypo from '@expo/vector-icons/Entypo';

const AddTenant = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [doj, setDoj] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Placeholder data (fetch from DB in backend)
  const names = ['John Doe', 'Jane Smith', 'Michael Brown']; // Replace with API data
  const rooms = ['101', '102', '103', '104']; // Replace with API data

  const handleAddTenant = () => {
    if (selectedName && selectedRoom) {
      const newTenant = { id: Date.now(), name: selectedName, room: selectedRoom, doj };
      setTenants([...tenants, newTenant]);
      setModalVisible(false);
      setSelectedName('');
      setSelectedRoom('');
      setDoj(new Date());

      // TODO: Add API call to save tenant in DB
    }
  };

  const handleUnlinkTenant = (id) => {
    setTenants(tenants.filter(tenant => tenant.id !== id));

    // TODO: Add API call to update DB (set tenant to NULL)
  };

  return (
    <View style={styles.container}>
      {/* Add Tenant Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Tenant</Text>
      </TouchableOpacity>

      {/* Tenant List */}
      <FlatList
        data={tenants}
        key={`flatlist-${tenants.length}`} // Forces re-render when list changes
        keyExtractor={(item) => item.id.toString()}
        numColumns={1} // Ensures one tenant per row
        renderItem={({ item }) => (
          <View style={styles.tenantCard}>
            <Entypo name="user" size={30} color="black" />
            <Text style={styles.tenantName}>{item.name}</Text>
            <Text style={styles.tenantDetails}>Room: {item.room}</Text>
            <Text style={styles.tenantDetails}>DOJ: {item.doj.toDateString()}</Text>

            {/* Unlink Button */}
            <TouchableOpacity style={styles.unlinkButton} onPress={() => handleUnlinkTenant(item.id)}>
              <Text style={styles.unlinkButtonText}>Unlink</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => { setModalVisible(false); Keyboard.dismiss(); }}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}} accessible={false}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Tenant</Text>

                {/* Name Dropdown */}
                <Text style={styles.label}>Name</Text>
                <Picker selectedValue={selectedName} onValueChange={(itemValue) => setSelectedName(itemValue)} style={styles.picker} itemStyle={styles.pickerItem}>
                  <Picker.Item label="Select Name" value="" />
                  {names.map((name, index) => <Picker.Item key={index} label={name} value={name} />)}
                </Picker>

                {/* DOJ Calendar Picker */}
                <Text style={styles.label}>Date of Joining</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                  <Text>{doj ? doj.toDateString() : "Select Date"}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={doj || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (event.type !== "dismissed") {
                        setDoj(selectedDate || new Date());
                      }
                    }}
                  />
                )}

                {/* Room Number Dropdown */}
                <Text style={styles.label}>Room No.</Text>
                <Picker selectedValue={selectedRoom} onValueChange={(itemValue) => setSelectedRoom(itemValue)} style={styles.picker} itemStyle={styles.pickerItem}>
                  <Picker.Item label="Select Room" value="" />
                  {rooms.map((room, index) => <Picker.Item key={index} label={room} value={room} />)}
                </Picker>

                {/* Add Tenant Button */}
                <TouchableOpacity style={styles.modalButton} onPress={handleAddTenant}>
                  <Text style={styles.modalButtonText}>Add Tenant</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tenantCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10, // Ensures each card is in a new row
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tenantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#000',
  },
  tenantDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  unlinkButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  unlinkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  picker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
    color: '#000',
  },
  pickerItem: {
    color: '#000',
  },
  dateInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTenant;
