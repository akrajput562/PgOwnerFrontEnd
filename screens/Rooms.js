import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';

const Rooms = () => {
  const [selectedPG, setSelectedPG] = useState('PG1');
  const [selectedFloor, setSelectedFloor] = useState('Ground Floor');
  const [floors, setFloors] = useState([
    {
      title: 'Ground Floor',
      pg: 'PG1',
      rooms: [
        { id: '001', beds: ['P', 'V'] },
        { id: '002', beds: ['O', 'V'] },
      ],
    },
    {
      title: 'First Floor',
      pg: 'PG1',
      rooms: [
        { id: '101', beds: ['V', 'P'] },
      ],
    },
  ]);

  const getBedStatusColor = (status) => {
    switch (status) {
      case 'O': return '#ff4d4d'; // Red for Occupied
      case 'V': return '#4CAF50'; // Green for Vacant
      case 'P': return '#808080'; // Gray for Pending
      default: return '#9ca3af';
    }
  };

  const updateBedStatus = (floorIndex, roomIndex, bedIndex, status) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].rooms[roomIndex].beds[bedIndex] = status;
    setFloors(updatedFloors);
  };

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      {/* Header Navigation */}
      <View style={tw`flex-row items-center justify-between mb-2`}>
        <Text style={tw`text-xl font-bold text-black`}>Rooms</Text>
      </View>

      {/* Floor Selection Tabs */}
      <View style={tw`flex-row justify-center mb-2 border-b border-gray-300 pb-1`}>
        {floors.map((floor, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedFloor(floor.title)}
            style={[
              tw`px-4 py-2 mx-2`,
              selectedFloor === floor.title ? tw`border-b-4 border-blue-500` : tw`border-b-4 border-transparent`
            ]}
          >
            <Text style={tw`text-gray-700 font-semibold uppercase`}>
              {floor.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Room and Bed Layout */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {floors.filter(floor => floor.pg === selectedPG && floor.title === selectedFloor).map((floor, floorIndex) => (
          <View key={floor.title}>
            {floor.rooms.map((room, roomIndex) => (
              <View key={room.id} style={tw`flex-row items-center justify-center mb-3`}>
                
                {/* Room Number - Vertical Box */}
                <View style={tw`w-15 h-20 bg-gray-300 flex items-center justify-center rounded-lg mx-3 shadow-md`}>
                  <Text style={tw`text-lg font-bold text-gray-900`}>
                    {room.id}
                  </Text>
                </View>

                {/* Bed Layout */}
                <View style={tw`flex-row`}>
                  {room.beds.map((bed, bedIndex) => (
                    <TouchableOpacity
                      key={bedIndex}
                      onPress={() => updateBedStatus(floorIndex, roomIndex, bedIndex, bed === 'O' ? 'V' : 'O')}
                      style={[
                        tw`w-15 h-20 mx-3 rounded-lg flex items-center justify-center shadow-md`,
                        { backgroundColor: getBedStatusColor(bed) },
                      ]}
                    >
                      <Text style={tw`text-white font-bold text-lg`}>
                        {bed}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Rooms;
