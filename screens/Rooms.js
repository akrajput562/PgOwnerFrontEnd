import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const Rooms = ({ navigation }) => {
  const [selectedFloor, setSelectedFloor] = useState('GROUND');
  const [selectedDate, setSelectedDate] = useState('Jan 04, 2025');
  const [filterPendingDues, setFilterPendingDues] = useState(true);
  
  const floors = [
    { id: 'GROUND', title: 'GROUND', rooms: [
      { id: '001', beds: [{ status: 'P', position: 1 }, { status: 'V', position: 2 }, { status: 'V', position: 3 }] },
      { id: '002', beds: [{ status: 'P', position: 1 }, { status: 'O', position: 2 }, { status: 'V', position: 3 }] },
      { id: '003', beds: [{ status: 'P', position: 1 }, { status: 'V', position: 2 }, { status: 'V', position: 3 }] },
      { id: '004', beds: [{ status: 'P', position: 1 }, { status: 'P', position: 2 }, { status: 'V', position: 3 }] },
      { id: '005', beds: [{ status: 'P', position: 1 }, { status: 'P', position: 2 }, { status: 'V', position: 3 }] },
    ]},
    { id: 'FIRST', title: 'FIRST', rooms: [
      { id: '101', beds: [{ status: 'P', position: 1 }, { status: 'V', position: 2 }, { status: 'V', position: 3 }] },
    ]},
    { id: 'SECOND', title: 'SECOND', rooms: [
      { id: '201', beds: [{ status: 'P', position: 1 }, { status: 'V', position: 2 }, { status: 'V', position: 3 }] },
      { id: '202', beds: [{ status: 'O', position: 1 }, { status: 'V', position: 2 }, { status: 'V', position: 3 }] },
      { id: '203', beds: [{ status: 'P', position: 1 }, { status: 'P', position: 2 }, { status: 'V', position: 3 }] },
    ]},
    { id: 'THIRD', title: 'THIRD', rooms: [
      { id: '301', beds: [{ status: 'P', position: 1 }, { status: 'O', position: 2 }, { status: 'V', position: 3 }] },
      { id: '302', beds: [{ status: 'V', position: 1 }, { status: 'V', position: 2 }, { status: 'V', position: 3 }] },
      { id: '303', beds: [{ status: 'P', position: 1 }, { status: 'P', position: 2 }, { status: 'O', position: 3 }] },
    ]},
    { id: 'FOURTH', title: 'FOURTH', rooms: [
      { id: '401', beds: [{ status: 'P', position: 1 }, { status: 'V', position: 2 }, { status: 'O', position: 3 }] },
      { id: '402', beds: [{ status: 'O', position: 1 }, { status: 'P', position: 2 }, { status: 'V', position: 3 }] },
    ]},
  ];

  const getBedStatusColor = (status) => {
    switch (status) {
      case 'O': return '#FF2D2D'; // Red for Occupied
      case 'V': return '#FFFFFF'; // White for Vacant
      case 'P': return '#8A7EF6'; // Purple for Pending dues
      default: return '#FFFFFF';
    }
  };

  const getBedStatusBackgroundColor = (status) => {
    switch (status) {
      case 'O': return '#FFFFFF'; // White background
      case 'V': return '#FFFFFF'; // White background
      case 'P': return '#E9EAFF'; // Light purple for Pending
      default: return '#FFFFFF';
    }
  };

  const renderHeader = () => (
    <View style={tw`bg-white p-4 border-b border-gray-200`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-xl font-bold text-gray-800`}>PG Sunrise Rooms</Text>
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
      
      <TouchableOpacity 
        style={tw`flex-row items-center px-4 py-2 rounded-full border border-gray-300`}
      >
        <Text style={tw`text-gray-700 font-semibold mr-2`}>{selectedDate}</Text>
        <Ionicons name="chevron-down" size={16} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );

  const renderFloorTabs = () => (
    <View style={tw`flex-row justify-around border-b border-gray-200`}>
      {floors.map((floor) => (
        <TouchableOpacity
          key={floor.id}
          onPress={() => setSelectedFloor(floor.id)}
          style={[
            tw`py-3 px-2`,
            selectedFloor === floor.id ? tw`border-b-2 border-indigo-600` : null
          ]}
        >
          <Text style={[
            tw`font-semibold`,
            selectedFloor === floor.id ? tw`text-indigo-600` : tw`text-gray-600`
          ]}>
            {floor.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderFloorTitle = (floorTitle) => (
    <View style={tw`p-4`}>
      <Text style={tw`text-gray-700`}>{floorTitle.toLowerCase()} floor</Text>
    </View>
  );

  const renderRooms = () => {
    const currentFloor = floors.find(f => f.id === selectedFloor);
    if (!currentFloor) return null;

    return (
      <View style={tw`p-4`}>
        {currentFloor.rooms.map((room) => (
          <View key={room.id} style={tw`flex-row mb-6`}>
            <TouchableOpacity style={tw`w-20 h-20 bg-gray-100 rounded-lg mr-3 justify-center items-center`}>
              <Text style={tw`font-semibold text-gray-700`}>{room.id}</Text>
              <Ionicons name="chevron-forward" size={16} color="#6B7280" />
            </TouchableOpacity>
            
            {room.beds.map((bed, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  tw`w-20 h-20 rounded-lg mr-3 justify-center items-center`,
                  { backgroundColor: getBedStatusBackgroundColor(bed.status) }
                ]}
              >
                {bed.status === 'P' && (
                  <View style={tw`items-center justify-center`}>
                    <Ionicons name="hourglass-outline" size={24} color="#8A7EF6" />
                  </View>
                )}
                {bed.status === 'O' && (
                  <View style={tw`items-center justify-center`}>
                    <View style={styles.checkmark}>
                      <Ionicons name="checkmark" size={24} color="#fff" />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {renderHeader()}
      {renderFilters()}
      {renderFloorTabs()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderFloorTitle(selectedFloor)}
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
  }
});

export default Rooms;
