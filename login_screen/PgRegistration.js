import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image, FlatList, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const PgRegistration = () => {
  const [step, setStep] = React.useState(1);
  const [propertyDetails, setPropertyDetails] = React.useState({
    name: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    houseNo: '',
    locality: '',
    propertyType: ''
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
  const navigation = useNavigation();

  useEffect(() => {
    // TODO: Fetch cities and states from API
    setStates(['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'West Bengal', 'Punjab', 'Haryana']);
    setCities(['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Lucknow', 'Ahmedabad', 'Jaipur', 'Kolkata', 'Chandigarh', 'Gurgaon']);
  }, []);

  const validateStep1 = () => {
    const newErrors = {};
    if (!propertyDetails.name) newErrors.name = 'Property name is required';
    if (!propertyDetails.address) newErrors.address = 'Address is required';
    if (!propertyDetails.pincode) newErrors.pincode = 'Pincode is required';
    if (!propertyDetails.city) newErrors.city = 'City is required';
    if (!propertyDetails.state) newErrors.state = 'State is required';
    if (!propertyDetails.propertyType) newErrors.propertyType = 'Property type is required';
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

  const renderStep1 = () => (
    <LinearGradient colors={['#ffffff', '#f0f0f0']} style={styles.gradientContainer}>
      <Text style={styles.stepTitle}>Step 1: Property Details</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Property Name"
          value={propertyDetails.name}
          onChangeText={(text) => setPropertyDetails({ ...propertyDetails, name: text })}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={propertyDetails.address}
          onChangeText={(text) => setPropertyDetails({ ...propertyDetails, address: text })}
        />
        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          value={propertyDetails.pincode}
          onChangeText={(text) => setPropertyDetails({ ...propertyDetails, pincode: text })}
        />
        {errors.pincode && <Text style={styles.errorText}>{errors.pincode}</Text>}
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
          selectedValue={propertyDetails.propertyType}
          onValueChange={(itemValue) => setPropertyDetails({ ...propertyDetails, propertyType: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="Select Property Type" value="" />
          <Picker.Item label="PG" value="PG" />
          <Picker.Item label="Hostel" value="Hostel" />
          <Picker.Item label="Apartment" value="Apartment" />
        </Picker>
        {errors.propertyType && <Text style={styles.errorText}>{errors.propertyType}</Text>}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => validateStep1() && setStep(2)}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
 
  const renderStep2 = () => (
    <LinearGradient colors={['#ffffff', '#f0f0f0']} style={styles.gradientContainer}>
      <Text style={styles.stepTitle}>Step 2: Tenant Details</Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, tenantDetails.boys && styles.selectedCard]}
          onPress={() => setTenantDetails({ ...tenantDetails, boys: !tenantDetails.boys })}
        >
          <Text style={styles.cardText}>Boys</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, tenantDetails.girls && styles.selectedCard]}
          onPress={() => setTenantDetails({ ...tenantDetails, girls: !tenantDetails.girls })}
        >
          <Text style={styles.cardText}>Girls</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, tenantDetails.coLive && styles.selectedCard]}
          onPress={() => setTenantDetails({ ...tenantDetails, coLive: !tenantDetails.coLive })}
        >
          <Text style={styles.cardText}>Co-Live</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, tenantDetails.students && styles.selectedCard]}
          onPress={() => setTenantDetails({ ...tenantDetails, students: !tenantDetails.students })}
        >
          <Text style={styles.cardText}>Students</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, tenantDetails.professionals && styles.selectedCard]}
          onPress={() => setTenantDetails({ ...tenantDetails, professionals: !tenantDetails.professionals })}
        >
          <Text style={styles.cardText}>Professionals</Text>
        </TouchableOpacity>
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
      <Text style={styles.stepTitle}>Step 3: Sharing Types</Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, sharingTypes.includes('Single') && styles.selectedCard]}
          onPress={() => setSharingTypes([...sharingTypes, 'Single'])}
        >
          <Text style={styles.cardText}>Single</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, sharingTypes.includes('Double') && styles.selectedCard]}
          onPress={() => setSharingTypes([...sharingTypes, 'Double'])}
        >
          <Text style={styles.cardText}>Double</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, sharingTypes.includes('Triple') && styles.selectedCard]}
          onPress={() => setSharingTypes([...sharingTypes, 'Triple'])}
        >
          <Text style={styles.cardText}>Triple</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => setStep(4)}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  const renderStep4 = () => (
    <LinearGradient colors={['#ffffff', '#f0f0f0']} style={styles.gradientContainer}>
      <Text style={styles.stepTitle}>Step 4: Floors</Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, floors.includes('Ground') && styles.selectedCard]}
          onPress={() => setFloors([...floors, 'Ground'])}
        >
          <Text style={styles.cardText}>Ground</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, floors.includes('First') && styles.selectedCard]}
          onPress={() => setFloors([...floors, 'First'])}
        >
          <Text style={styles.cardText}>First</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, floors.includes('Second') && styles.selectedCard]}
          onPress={() => setFloors([...floors, 'Second'])}
        >
          <Text style={styles.cardText}>Second</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={() => setIsSubmitting(true)}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
});

export default PgRegistration;
