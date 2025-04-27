import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/auth';
const PgListScreen = () => {
  const navigation = useNavigation();
  const [pgList, setPgList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching PG properties from an API (replace this with your API call)
  // useEffect(() => {
  //   // TODO: Replace the following dummy data with an API call to fetch PG properties
  //   setTimeout(() => {
  //     const data = [
  //       { pg_id: '1', pg_name: 'PG Property 1', address: 'Address 1' },
  //       { pg_id: '2', pg_name: 'PG Property 2', address: 'Address 2' },
  //       { pg_id: '3', pg_name: 'PG Property 3', address: 'Address 3' },
  //     ];
  //     setPgList(data);
  //     setLoading(false);
  //   }, 2000);
  // }, []);

    useEffect(()=>{
      fetchProperties();
      setLoading(false);
    },[]);

    const fetchProperties = async ()=>{
      const authToken  = await AsyncStorage.getItem('authToken');
      try{
        const response = await apiClient(
          "/pg/getPgDtlsByUserId",
          "POST",
          {user_id:1},
          authToken,
          {
            "Content-Type":"application/json"
          }
        );
        if(Array.isArray(response)){
          setPgList (response);
        }else{
          console.log("Expected array, got:",response)
        }
      }catch (error){
        console.log("Error fetching properites",error)
      }
    }
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.pgCard} 
      onPress={() => navigation.navigate('RoomSection', { pgId: item.pg_id })} // Adjust screen name as needed
    >
      <Text style={styles.pgName}>{item.pg_name}</Text>
      <Text style={styles.pgAddress}>{item.address}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a PG Property</Text>
      <FlatList
        data={pgList}
        keyExtractor={(item) => item.pg_id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      {/* Add Property Button */}
      <TouchableOpacity 
        style={styles.addPropertyButton} 
        onPress={() => {
          // Navigation placeholder: change to desired screen if needed
          navigation.navigate('PgRegistration');
        }}
      >
        <Text style={styles.addPropertyButtonText}>Add Property</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  pgCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pgName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pgAddress: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPropertyButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addPropertyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PgListScreen;
