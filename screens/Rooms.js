import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import apiClient from "../api/auth";

const Rooms = ({ navigation }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedDate, setSelectedDate] = useState('Jan 04, 2025');
  const [filterPendingDues, setFilterPendingDues] = useState(true);
  const [properties, setProperties] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const authToken = await AsyncStorage.getItem('authToken');

    try {
      const response = await apiClient(
        "/pg/getPgDtlsByUserId",
        "POST",
        { user_id: 1 },
        authToken,
        { "Content-Type": "application/json" }
      );
      if (Array.isArray(response)) {
        setProperties(response);
      } else {
        console.error("Expected array, got:", response);
      }
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  };

  const fetchRoomLayouts = async (pgId) => {
    const authToken = await AsyncStorage.getItem('authToken');

    try {
      const response = await apiClient(
        "/pg/getRoomLayoutDtls",
        "POST",
        { pg_id: pgId, user_id:1 },
        authToken,
        { "Content-Type": "application/json" }
      );

      if (Array.isArray(response)) {
        const data =  response;

        const parsedRooms = data.map(room => ({
          noOfBeds: parseInt(room.no_of_beds, 10),
          roomNo: room.room_no,
          pgId: parseInt(room.pg_id, 10),
          userId: parseInt(room.user_id, 10),
          occupy: parseInt(room.occupy, 10),
          availableBeds: parseInt(room.available_beds ?? (room.no_of_beds - room.occupy), 10),
          floorNo: room.floor_no 
        }));

        setRooms(parsedRooms);

        if (parsedRooms.length > 0) {
          setSelectedFloor(parsedRooms[0].floorNo);
        }
      } else {
        console.error("Failed to fetch room layouts");
      }
    } catch (error) {
      console.error("Error fetching room layouts:", error);
    }
  };

  const getBedStatus = (room) => {
    if (room.occupy === 0) return 'V'; // Vacant
    if (room.occupy === room.noOfBeds) return 'O'; // Occupied
    return 'P'; // Partially occupied
  };

  const getBedStatusBackgroundColor = (status) => {
    switch (status) {
      case 'O': return '#FFFFFF';
      case 'V': return '#FFFFFF';
      case 'P': return '#E9EAFF';
      default: return '#FFFFFF';
    }
  };

  const renderPropertySelection = () => (
    <View style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-xl font-bold text-gray-800 mb-4`}>Select Property</Text>
      {properties.map((property) => (
        <TouchableOpacity
          key={property.pg_id}
          style={[
            tw`p-4 mb-3 rounded-lg border`,
            selectedProperty?.pg_id === property.pg_id ? tw`border-indigo-500 bg-indigo-50` : tw`border-gray-200`
          ]}
          onPress={() => {
            setSelectedProperty(property);
            fetchRoomLayouts(property.pg_id);
          }}
        >
          <Text style={tw`text-lg font-semibold text-gray-800`}>{property.pg_name}</Text>
          <Text style={tw`text-gray-600 mt-1`}>{property.pg_name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderHeader = () => (
    <View style={tw`bg-white p-4 border-b border-gray-200`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-xl font-bold text-gray-800`}>{selectedProperty?.pg_name || 'Select Property'}</Text>
        <View style={tw`flex-row`}>
          <TouchableOpacity style={tw`mr-4`}>
            <Ionicons name="filter-outline" size={22} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={22} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`flex-row mt-3`}>
        <TouchableOpacity style={tw`bg-indigo-50 px-3 py-1 rounded-md mr-2`}>
          <Text style={tw`text-indigo-600`}>All Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-gray-100 px-3 py-1 rounded-md mr-2`}>
          <Text style={tw`text-gray-600`}>Vacant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-gray-100 px-3 py-1 rounded-md mr-2`}>
          <Text style={tw`text-gray-600`}>Occupied</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFilters = () => (
    <View style={tw`flex-row justify-start px-4 py-2`}>
      <TouchableOpacity 
        style={[
          tw`flex-row items-center px-4 py-2 rounded-full mr-2 border`, 
          filterPendingDues ? tw`border-indigo-400 bg-indigo-100` : tw`border-gray-300`
        ]}
        onPress={() => setFilterPendingDues(!filterPendingDues)}
      >
        <Text style={tw`text-indigo-700 font-semibold mr-2`}>Pending dues</Text>
        <Ionicons name="chevron-down" size={16} color="#6366F1" />
      </TouchableOpacity>
      
      <TouchableOpacity style={tw`flex-row items-center px-4 py-2 rounded-full border border-gray-300`}>
        <Text style={tw`text-gray-700 font-semibold mr-2`}>{selectedDate}</Text>
        <Ionicons name="chevron-down" size={16} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );

  const renderFloorTabs = () => {
    const floors = [...new Set(rooms.map(room => room.floorNo))].sort();

    return (
      <View style={tw`flex-row justify-around border-b border-gray-200`}>
        {floors.map((floor) => (
          <TouchableOpacity
            key={floor}
            onPress={() => setSelectedFloor(floor)}
            style={[tw`py-3 px-2`, selectedFloor === floor ? tw`border-b-2 border-indigo-600` : null]}
          >
            <Text style={[tw`font-semibold`, selectedFloor === floor ? tw`text-indigo-600` : tw`text-gray-600`]}>
              {floor}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderRooms = () => {
    const floorRooms = rooms.filter(room =>
      room.floorNo === selectedFloor &&
      (!selectedProperty || room.pgId === selectedProperty.pg_id)
    );

    return (
      <View style={tw`p-4`}>
        {floorRooms.map((room) => (
          <View key={`${room.roomNo}-${room.pgId}`} style={tw`flex-row mb-6`}>
            <TouchableOpacity style={tw`w-20 h-20 bg-gray-100 rounded-lg mr-3 justify-center items-center`}>
              <Text style={tw`font-semibold text-gray-700`}>{room.roomNo}</Text>
              <Ionicons name="chevron-forward" size={16} color="#6B7280" />
            </TouchableOpacity>

            {Array.from({ length: room.noOfBeds }).map((_, index) => {
              const status = getBedStatus(room);
              return (
                <TouchableOpacity
                  key={`${room.roomNo}-${room.pgId}-${index}`}
                  style={[
                    tw`w-20 h-20 rounded-lg mr-3 justify-center items-center`,
                    { backgroundColor: getBedStatusBackgroundColor(status) }
                  ]}
                >
                  {status === 'P' && (
                    <View style={tw`items-center justify-center`}>
                      <Ionicons name="hourglass-outline" size={24} color="#8A7EF6" />
                    </View>
                  )}
                  {status === 'O' && (
                    <View style={tw`items-center justify-center`}>
                      <View style={styles.checkmark}>
                        <Ionicons name="checkmark" size={24} color="#fff" />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  if (!selectedProperty) {
    return renderPropertySelection();
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      {renderHeader()}
      {renderFilters()}
      {renderFloorTabs()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderRooms()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  checkmark: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF2D2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Rooms;
