import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, SectionList, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Rooms = () => {
  const navigation = useNavigation();
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('roomNumber');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFloors, setExpandedFloors] = useState({});
  const animatedValues = {};

  // Sample data for rooms
  const floors = [
    {
      title: 'Ground Floor',
      stats: { totalRooms: 3, totalBeds: 6, occupiedBeds: 3 },
      data: [
        { id: 'G101', beds: ['Vacant', 'Filled', 'Under Notice'], type: 'AC', tenants: 2 },
        { id: 'G102', beds: ['Filled', 'Filled'], type: 'Non-AC', tenants: 2 },
        { id: 'G103', beds: ['Vacant'], type: 'AC', tenants: 0 },
      ],
    },
    {
      title: 'First Floor',
      stats: { totalRooms: 2, totalBeds: 3, occupiedBeds: 1 },
      data: [
        { id: 'F101', beds: ['Vacant', 'Vacant'], type: 'Non-AC', tenants: 0 },
        { id: 'F102', beds: ['Filled'], type: 'AC', tenants: 1 },
      ],
    },
  ];

  const getBedIcon = (status) => {
    switch (status) {
      case 'Filled': return { icon: 'bed', color: '#9333ea' };
      case 'Vacant': return { icon: 'bed-outline', color: '#9ca3af' };
      case 'Under Notice': return { icon: 'bed', color: '#fbbf24' };
      default: return { icon: 'bed', color: '#9ca3af' };
    }
  };

  const toggleFloor = (floor) => {
    setExpandedFloors(prev => ({
      ...prev,
      [floor]: !prev[floor]
    }));
  };

  const renderFloorHeader = ({ section: { title, stats } }) => (
    <LinearGradient
      colors={['#EBF4FF', '#DBEAFE']}
      style={tw`p-4`}
    >
      <TouchableOpacity onPress={() => toggleFloor(title)}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-bold text-lg text-blue-900`}>{title}</Text>
          <MaterialIcons
            name={expandedFloors[title] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="#1e3a8a"
          />
        </View>
        <View style={tw`flex-row justify-between mt-2`}>
          <View style={tw`flex-row items-center`}>
            <FontAwesome name="building" size={14} color="#1e3a8a" style={tw`mr-1`} />
            <Text style={tw`text-sm text-blue-900`}>{stats.totalRooms} Rooms</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <FontAwesome name="bed" size={14} color="#1e3a8a" style={tw`mr-1`} />
            <Text style={tw`text-sm text-blue-900`}>{stats.totalBeds} Beds</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <FontAwesome name="user" size={14} color="#1e3a8a" style={tw`mr-1`} />
            <Text style={tw`text-sm text-blue-900`}>{stats.occupiedBeds} Occupied</Text>
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );

  const renderRoom = ({ item }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 1.05,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          style={tw`m-2 p-4 bg-white rounded-lg shadow-lg`}
          onPress={() => navigation.navigate('RoomDetails', { room: item })}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={tw`font-bold text-lg text-gray-900`}>{item.id}</Text>
              <Text style={tw`text-sm text-gray-500`}>{item.type}</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="people" size={16} color="#6b7280" style={tw`mr-1`} />
              <Text style={tw`text-gray-600`}>{item.tenants}</Text>
            </View>
          </View>
          <View style={tw`mt-2 flex-row flex-wrap`}>
            {item.beds.map((bed, index) => {
              const { icon, color } = getBedIcon(bed);
              return (
                <View key={index} style={tw`mr-2 mb-2`}>
                  <Ionicons name={icon} size={16} color={color} />
                </View>
              );
            })}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const filteredData = floors.map(floor => ({
    ...floor,
    data: floor.data.filter(room => 
      (filterStatus === 'All' || room.beds.includes(filterStatus)) &&
      room.id.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
      if (sortBy === 'roomNumber') return a.id.localeCompare(b.id);
      return a.status?.localeCompare(b.status);
    })
  }));

  return (
    <LinearGradient colors={['#EBF4FF', '#FFFFFF']} style={tw`flex-1`}>
      {/* Filter and Sort Controls */}
      <View style={tw`p-4 bg-white shadow-lg`}>
        <TextInput
          style={tw`bg-gray-100 p-3 rounded-lg mb-2 text-gray-700`}
          placeholder="Search rooms..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={tw`flex-row justify-between`}>
          <View style={tw`flex-1 mr-2`}>
            <Picker
              selectedValue={filterStatus}
              onValueChange={(itemValue) => setFilterStatus(itemValue)}
              style={tw`bg-gray-100 rounded-lg`}
            >
              <Picker.Item label="All Statuses" value="All" />
              <Picker.Item label="Vacant" value="Vacant" />
              <Picker.Item label="Filled" value="Filled" />
              <Picker.Item label="Under Notice" value="Under Notice" />
            </Picker>
          </View>
          <View style={tw`flex-1 ml-2`}>
            <Picker
              selectedValue={sortBy}
              onValueChange={(itemValue) => setSortBy(itemValue)}
              style={tw`bg-gray-100 rounded-lg`}
            >
              <Picker.Item label="Sort by Room" value="roomNumber" />
              <Picker.Item label="Sort by Status" value="status" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Room List */}
      <SectionList
        sections={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
        renderSectionHeader={renderFloorHeader}
        contentContainerStyle={tw`p-2`}
        extraData={expandedFloors}
        renderSectionFooter={({ section }) => (
          !expandedFloors[section.title] && (
            <View style={tw`p-2 bg-blue-50`}>
              <Text style={tw`text-center text-blue-900`}>Tap to expand</Text>
            </View>
          )
        )}
        ListEmptyComponent={() => (
          <View style={tw`p-4`}>
            <Text style={tw`text-center text-gray-500`}>No rooms found</Text>
          </View>
        )}
      />
    </LinearGradient>
  );
};

export default Rooms;
