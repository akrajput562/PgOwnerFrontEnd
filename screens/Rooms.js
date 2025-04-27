import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/auth';

const Rooms = ({ navigation }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [rooms,setRooms] = useState([]);
  const[properties, setProperties] = useState([]);
  useEffect(()=>{
    fetchProperties();
  },[]);
  const [selectedFloor,setSelectedFloor] = useState(1);
  // const [properties] = useState([
  //   { pg_id: 1, pg_name: 'Test PG 1', address: '123 Main St' },
  //   { pg_id: 2, pg_name: 'Test PG 2', address: '456 Park Ave' }
  // ]);
  // const [rooms] = useState([
  //   { noOfBeds: 2, roomNo: '101', pgId: 1, userId: 1, occupy: 1, availableBeds: 1, floorNo: '1' },
  //   { noOfBeds: 3, roomNo: '102', pgId: 1, userId: 1, occupy: 2, availableBeds: 1, floorNo: '1' },
  //   { noOfBeds: 2, roomNo: '201', pgId: 1, userId: 1, occupy: 0, availableBeds: 2, floorNo: '2' },
  //   { noOfBeds: 4, roomNo: 'G01', pgId: 1, userId: 1, occupy: 3, availableBeds: 1, floorNo: '0' },
  //   { noOfBeds: 3, roomNo: 'G02', pgId: 1, userId: 1, occupy: 0, availableBeds: 3, floorNo: '0' }
  // ]);

  const getBedStatus = (room) => {
    if (room.occupy === 0) return 'V';
    if (room.occupy === room.noOfBeds) return 'O';
    return 'P';
  };

  const getBedStatusBackgroundColor = (status) => {
    switch (status) {
      case 'O': return '#FFE5E5';
      case 'V': return '#E5FFE5';
      case 'P': return '#E9EAFF';
      default: return '#FFFFFF';
    }
  };

  const getFloorName = (floorNo) => {
    switch(floorNo) {
      case '0': return 'Ground Floor';
      case '1': return 'First Floor';
      case '2': return 'Second Floor';
      case '3': return 'Third Floor';
      default: return `Floor ${floorNo}`;
    }
  };
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
      setProperties (response);
    }else{
      console.log("Expected array, got:",response)
    }
  }catch (error){
    console.log("Error fetching properites",error)
  }
}
const fetchRoomLayouts = async(pgId)=>{
  const authToken  = await AsyncStorage.getItem('authToken');
  try{
    const response = await apiClient(
      "/pg/getRoomLayoutDtls",
      "POST",
      {pg_id:pgId, user_id:1},
      authToken,
      {"Content-Type":"application/json"}
    );
    if(Array.isArray(response)){
      const data = response;
      const parsedRoom = data.map(room =>({
        noOfBeds:parseInt(room.no_of_beds,10),
        roomNo:room.room_no,
        pgId:parseInt(room.pg_id,10),
        userId:parseInt(room.user_id,10),
        occupy:parseInt(room.occupy,10),
        availableBeds:parseInt(room.availableBeds??(room.no_of_beds-room.occupy),10),
        floorNo:room.floor_no
      }));

      setRooms(parsedRoom);
      if(parsedRoom.length > 0){
        setSelectedFloor(parsedRoom[0].floorNo);
      }
    }else{
      console.log("Failed to fetch Room Layout");
    }
  }catch (error){
    console.error("Error fetching the room Layour",error);
  }
}
  const renderPropertySelection = () => (
    <View style={tw`flex-1 bg-white p-4`}>
      <View style={tw`mb-6`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-2`}>Select Property</Text>
        <Text style={tw`text-gray-600`}>Choose a property to view its room layout</Text>
      </View>
      {properties.map((property) => (
        <TouchableOpacity
          key={property.pg_id}
          style={[
            tw`p-4 mb-3 rounded-lg border`,
            selectedProperty?.pg_id === property.pg_id ? tw`border-indigo-500 bg-indigo-50` : tw`border-gray-200`
          ]}
          onPress={() =>{ 
            setSelectedProperty(property)
            fetchRoomLayouts(property.pg_id);
          }
          }>
          <Text style={tw`text-lg font-semibold text-gray-800`}>{property.pg_name}</Text>
          <Text style={tw`text-gray-600 mt-1`}>{property.address}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderFloorSection = (floorNo) => {
    const floorRooms = rooms.filter(room => 
      room.floorNo === floorNo && 
      (!selectedProperty || room.pgId === selectedProperty.pg_id)
    );

    if (floorRooms.length === 0) return null;

    return (
      <View key={floorNo} style={tw`mb-6`}>
        <View style={tw`bg-gray-100 p-3 rounded-t-lg`}>
          <Text style={tw`text-lg font-bold text-gray-800`}>{getFloorName(floorNo)}</Text>
        </View>
        <View style={tw`bg-white p-4 rounded-b-lg`}>
          {floorRooms.map((room) => (
            <View key={`${room.roomNo}-${room.pgId}`} style={tw`mb-4`}>
              <View style={tw`flex-row items-center mb-2`}>
                <Text style={tw`text-lg font-semibold text-gray-800 mr-2`}>Room {room.roomNo}</Text>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-sm text-gray-600`}>
                    {room.occupy}/{room.noOfBeds} Beds
                  </Text>
                  <View style={[
                    tw`ml-2 px-2 py-1 rounded-full`,
                    { backgroundColor: getBedStatusBackgroundColor(getBedStatus(room)) }
                  ]}>
                    <Text style={tw`text-xs font-semibold`}>
                      {getBedStatus(room) === 'V' ? 'Vacant' : 
                       getBedStatus(room) === 'O' ? 'Occupied' : 'Partially Occupied'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={tw`flex-row flex-wrap`}>
                {Array.from({ length: room.noOfBeds }).map((_, index) => (
                  <View
                    key={`${room.roomNo}-${room.pgId}-${index}`}
                    style={[
                      tw`w-12 h-12 rounded-lg mr-2 mb-2 justify-center items-center border`,
                      { 
                        backgroundColor: index < room.occupy ? '#FFE5E5' : '#E5FFE5',
                        borderColor: index < room.occupy ? '#FFB3B3' : '#B3FFB3'
                      }
                    ]}
                  >
                    <Ionicons 
                      name={index < room.occupy ? "person" : "bed"} 
                      size={20} 
                      color={index < room.occupy ? "#FF0000" : "#00FF00"} 
                    />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderRoomsLayout = () => {
    const floors = [...new Set(rooms.map(room => room.floorNo))].sort();
    
    return (
      <View style={tw`flex-1 bg-white`}>
        <View style={tw`bg-white p-4 border-b border-gray-200`}>
          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={tw`text-xl font-bold text-gray-800`}>{selectedProperty?.pg_name}</Text>
              <Text style={tw`text-gray-600`}>{selectedProperty?.address}</Text>
            </View>
            <View style={tw`flex-row`}>
              <TouchableOpacity style={tw`mr-4`}>
                <Ionicons name="filter-outline" size={22} color="#4B5563" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="search-outline" size={22} color="#4B5563" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={tw`flex-1 bg-gray-50`}>
          <View style={tw`p-4`}>
            {floors.map(floorNo => renderFloorSection(floorNo))}
          </View>
        </ScrollView>
      </View>
    );
  };

  if (!selectedProperty) {
    return renderPropertySelection();
  }

  return renderRoomsLayout();
};

export default Rooms;
