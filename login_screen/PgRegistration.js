import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image, FlatList, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import apiClient from "../api/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
const PgRegistration = () => {
  
  const [step, setStep] = React.useState(1);
  const [propertyDetails, setPropertyDetails] = React.useState({
    pg_name: '',
    pg_address: '',
    pin_code: '',
    city: '',
    state: '',
    property_type: '',
  
  });
  const [tenantDetails, setTenantDetails] = React.useState({
    boys: false,
    girls: false,
    coLive: false,
    students: false,
    professionals: false
  });
  const [sharingTypes, setSharingTypes] = React.useState([]);
  const [floors, setFloors] = React.useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [sharingDetails, setSharingDetails] = React.useState({
    type: '',
    rentAmount: '',
    depositAmount: ''
  });
  const [rooms, setRooms] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [floorNumber, setFloorNumber] = useState('');
  const [roomDetails, setRoomDetails] = useState({
    roomNo: '',
    sharingType: '',
    amount: '',
    deposit: ''
  });
  
  const navigation = useNavigation();

  useEffect(() => {
    // TODO: Fetch cities and states from API
    setStates(['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'West Bengal', 'Punjab', 'Haryana']);
    setCities(['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Lucknow', 'Ahmedabad', 'Jaipur', 'Kolkata', 'Chandigarh', 'Gurgaon']);
  }, []);

  const validateStep1 = () => {
    const newErrors = {};
    if (!propertyDetails.pg_name) newErrors.pg_name = 'Property name is required';
    if (!propertyDetails.pg_address) newErrors.pg_address = 'Address is required';
    if (!propertyDetails.pin_code) newErrors.pin_code = 'Pincode is required';
    if (!propertyDetails.city) newErrors.city = 'City is required';
    if (!propertyDetails.state) newErrors.state = 'State is required';
    if (!propertyDetails.property_type) newErrors.property_type = 'Property type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStep2 = () => {
    const newErrors = {};
    if (!tenantDetails.boys && !tenantDetails.girls && !tenantDetails.coLive) {
      newErrors.tenantType = 'Please select at least one tenant type';
    }
    if (!tenantDetails.students && !tenantDetails.professionals) {
      newErrors.tenantCategory = 'Please select at least one tenant category';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStep3 = () => {
    const newErrors = {};
    if (!sharingDetails.type) newErrors.type = 'Sharing type is required';
    if (!sharingDetails.rentAmount) newErrors.rentAmount = 'Rent amount is required';
    if (!sharingDetails.depositAmount) newErrors.depositAmount = 'Deposit amount is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSharingType = (type) => {
    setSharingTypes([...sharingTypes, type]);
  };
  const submitPropertyDetails = async () => {
    setIsSubmitting(true);
    const authToken = await AsyncStorage.getItem('authToken');

    if (!authToken) {
        Alert.alert("Error", "User is not authenticated!");
        setIsSubmitting(false);
        return;
    }

    try {
        // Dynamically build the who_can_stay & available_for values
        const who_can_stay = [];
        if (tenantDetails.boys) who_can_stay.push("Boys");
        if (tenantDetails.girls) who_can_stay.push("Girls");
        if (tenantDetails.coLive) who_can_stay.push("Co-Live");

        const available_for = [];
        if (tenantDetails.students) available_for.push("Students");
        if (tenantDetails.professionals) available_for.push("Working Professionals");

        // Build the floors array dynamically
        const formattedFloors = floors.map(floor => ({
            floor_no: floor.number,  // Dynamic floor number
            rooms: floor.rooms.map(room => ({
                room_no: room.roomNo,
                sharingType: room.sharingType,
                amount: room.amount,
                deposit: room.deposit
            }))
        }));

        // Construct final payload
        const payload = {
            pg_name: propertyDetails.pg_name,
            pg_address: propertyDetails.pg_address,
            pin_code: propertyDetails.pin_code,
            city: propertyDetails.city,
            state: propertyDetails.state,
            property_type: propertyDetails.property_type,
            who_can_stay: who_can_stay.join(","), // Convert array to comma-separated string
            available_for: available_for.join(","), // Convert array to comma-separated string
            floors: formattedFloors
        };

        console.log("Sending Payload:", JSON.stringify(payload));

        // Send request with JSON payload
        const response = await apiClient(
            "/pg/savePgData",
            "POST",
            payload, // Send as JSON
            authToken,
            { "Content-Type": "application/json" } // Ensure correct headers
        );

        if (response.success) {
            Alert.alert("Success", "Property registered successfully!");
            navigation.navigate("Home");
        } else {
            Alert.alert("Error", response.message || "Failed to register PG.");
        }
    } catch (error) {
        Alert.alert("Error", "Something went wrong. Please try again.");
        console.error("Error submitting form:", error);
    } finally {
        setIsSubmitting(false);
    }
};



  


  const renderStep1 = () => (
    <LinearGradient colors={['#ffffff', '#f0f0f0']} style={styles.gradientContainer}>
      <Text style={[styles.stepTitle, {textAlign: 'center', fontWeight: 'bold'}]}>Add Property</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Property Name"
          value={propertyDetails.pg_name}
          onChangeText={(text) => setPropertyDetails({ ...propertyDetails, pg_name: text })}
        />
        {errors.pg_name && <Text style={styles.errorText}>{errors.pg_name}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="PG Address"
          value={propertyDetails.pg_address}
          onChangeText={(text) => setPropertyDetails({ ...propertyDetails, pg_address: text })}
        />
        {errors.pg_address && <Text style={styles.errorText}>{errors.pg_address}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          value={propertyDetails.pin_code}
          onChangeText={(text) => setPropertyDetails({ ...propertyDetails, pin_code: text })}
          keyboardType="numeric"
        />
        {errors.pin_code && <Text style={styles.errorText}>{errors.pin_code}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={propertyDetails.city}
          onValueChange={(itemValue) => setPropertyDetails({ ...propertyDetails, city: itemValue })}
        >
          <Picker.Item label="Select City" value="" />
          {cities.map((city) => (
            <Picker.Item key={city} label={city} value={city} />
          ))}
        </Picker>
        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={propertyDetails.state}
          onValueChange={(itemValue) => setPropertyDetails({ ...propertyDetails, state: itemValue })}
        >
          <Picker.Item label="Select State" value="" />
          {states.map((state) => (
            <Picker.Item key={state} label={state} value={state} />
          ))}
        </Picker>
        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={propertyDetails.property_type}
          onValueChange={(itemValue) => setPropertyDetails({ ...propertyDetails, property_type: itemValue })}
        >
          <Picker.Item label="Select Property Type" value="" />
          <Picker.Item label="PG" value="PG" />
          <Picker.Item label="Hostel" value="Hostel" />
          <Picker.Item label="Hotel" value="Hotel" />
          <Picker.Item label="Apartment" value="Apartment" />
        </Picker>
        {errors.property_type && <Text style={styles.errorText}>{errors.property_type}</Text>}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => validateStep1() && setStep(2)}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  const renderStep2 = () => (
    <LinearGradient colors={['#ffffff', '#f0f0f0']} style={styles.gradientContainer}>
      <Text style={styles.stepTitle}>Step 2: Tenant Details</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Who Can Stay</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, tenantDetails.boys && styles.selectedCheckbox]}
            onPress={() => setTenantDetails({ ...tenantDetails, boys: !tenantDetails.boys })}
          >
            {tenantDetails.boys && <MaterialIcons name="check" size={18} style={styles.checkmark} />}
            <Text style={styles.checkboxText}>Boys</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, tenantDetails.girls && styles.selectedCheckbox]}
            onPress={() => setTenantDetails({ ...tenantDetails, girls: !tenantDetails.girls })}
          >
            {tenantDetails.girls && <MaterialIcons name="check" size={18} style={styles.checkmark} />}
            <Text style={styles.checkboxText}>Girls</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, tenantDetails.coLive && styles.selectedCheckbox]}
            onPress={() => setTenantDetails({ ...tenantDetails, coLive: !tenantDetails.coLive })}
          >
            {tenantDetails.coLive && <MaterialIcons name="check" size={18} style={styles.checkmark} />}
            <Text style={styles.checkboxText}>Co-Live</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Available For</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, tenantDetails.students && styles.selectedCheckbox]}
            onPress={() => setTenantDetails({ ...tenantDetails, students: !tenantDetails.students })}
          >
            {tenantDetails.students && <MaterialIcons name="check" size={18} style={styles.checkmark} />}
            <Text style={styles.checkboxText}>Students</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, tenantDetails.professionals && styles.selectedCheckbox]}
            onPress={() => setTenantDetails({ ...tenantDetails, professionals: !tenantDetails.professionals })}
          >
            {tenantDetails.professionals && <MaterialIcons name="check" size={18} style={styles.checkmark} />}
            <Text style={styles.checkboxText}>Working Professionals</Text>
          </TouchableOpacity>
        </View>
      </View>
      {errors.tenantType && <Text style={styles.errorText}>{errors.tenantType}</Text>}
      {errors.tenantCategory && <Text style={styles.errorText}>{errors.tenantCategory}</Text>}
      <TouchableOpacity style={styles.nextButton} onPress={() => validateStep2() && setStep(3)}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
  const renderStep3 = () => (
    <LinearGradient colors={['#ffffff', '#f0f0f0']} style={styles.gradientContainer}>
      <Text style={styles.stepTitle}>Step 3: Sharing Type</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Add Sharing Type</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addSharingType('Single')}
          >
            <Text style={styles.addButtonText}>Add Single</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addSharingType('Double')}
          >
            <Text style={styles.addButtonText}>Add Double</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addSharingType('Triple')}
          >
            <Text style={styles.addButtonText}>Add Triple</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={sharingDetails.type}
            onValueChange={(itemValue) => setSharingDetails({ ...sharingDetails, type: itemValue })}
          >
            <Picker.Item label="Select Sharing Type" value="" />
            {sharingTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
          {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Rent Amount (INR)"
            value={sharingDetails.rentAmount}
            onChangeText={(text) => setSharingDetails({ ...sharingDetails, rentAmount: text })}
            keyboardType="numeric"
          />
          {errors.rentAmount && <Text style={styles.errorText}>{errors.rentAmount}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Deposit Amount (INR)"
            value={sharingDetails.depositAmount}
            onChangeText={(text) => setSharingDetails({ ...sharingDetails, depositAmount: text })}
            keyboardType="numeric"
          />
          {errors.depositAmount && <Text style={styles.errorText}>{errors.depositAmount}</Text>}
        </View>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => validateStep3() && setStep(4)}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
  const renderStep4 = () => (
    <LinearGradient colors={['#ffffff', '#f0f0f0']} style={styles.gradientContainer}>
      <Text style={styles.stepTitle}>Step 4: Floor & Room Planning</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Add Floor</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => {
          setFloors([...floors, { number: '', rooms: [] }]);
          setSelectedFloor(floors.length);
        }}>
          <Text style={styles.addButtonText}>Add Floor</Text>
        </TouchableOpacity>

        {floors.map((floor, floorIndex) => (
          <View key={floorIndex} style={styles.itemContainer}>
            <TouchableOpacity style={styles.item} onPress={() => setSelectedFloor(floorIndex)}>
              <Text>Floor {floorIndex + 1} {floor.number ? `- ${floor.number}` : ''}</Text>
            </TouchableOpacity>

            {selectedFloor === floorIndex && (
              <View style={styles.detailsContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Floor Name/Number"
                  value={floor.number}
                  onChangeText={(text) => {
                    const updatedFloors = [...floors];
                    updatedFloors[floorIndex].number = text;
                    setFloors(updatedFloors);
                  }}
                />
                <TouchableOpacity style={styles.saveButton} onPress={() => setSelectedFloor(null)}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            )}

            {floor.number && (
              <View>
                <Text style={styles.sectionTitle}>Rooms in {floor.number}</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => {
                  const updatedFloors = [...floors];
                  updatedFloors[floorIndex].rooms.push({
                    room_no: '',
                    sharingType: '',
                    amount: '',
                    deposit: '',
                  });
                  setFloors(updatedFloors);
                }}>
                  <Text style={styles.addButtonText}>Add Room</Text>
                </TouchableOpacity>

                {floor.rooms.map((room, roomIndex) => (
                  <View key={roomIndex} style={styles.itemContainer}>
                    <TouchableOpacity style={styles.item} onPress={() => setSelectedRoom(`${floorIndex}-${roomIndex}`)}>
                      <Text>Room {roomIndex + 1}</Text>
                    </TouchableOpacity>

                    {selectedRoom === `${floorIndex}-${roomIndex}` && (
                      <View style={styles.detailsContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="Room No"
                          value={room.roomNo}
                          onChangeText={(text) => {
                            const updatedFloors = [...floors];
                            updatedFloors[floorIndex].rooms[roomIndex].roomNo = text;
                            setFloors(updatedFloors);
                          }}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Amount (INR)"
                          value={room.amount}
                          onChangeText={(text) => {
                            const updatedFloors = [...floors];
                            updatedFloors[floorIndex].rooms[roomIndex].amount = text;
                            setFloors(updatedFloors);
                          }}
                          keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={() => setSelectedRoom(null)}>
                          <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={submitPropertyDetails}>
        <Text style={styles.nextButtonText}>Submit</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
       {step === 4 && renderStep4()} 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  gradientContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  picker: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCard: {
    borderColor: '#007bff',
    backgroundColor: '#e3f2fd',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCheckbox: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
    borderWidth: 1,
  },
  checkboxText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#333',
  },
  checkmark: {
    marginRight: 8,
    color: '#4caf50',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  itemContainer: {
    marginBottom: 10,
  },
  item: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default PgRegistration;
