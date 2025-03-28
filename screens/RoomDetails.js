import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'twrnc';

const RoomDetails = ({ route }) => {
  const { room } = route.params;

  // Sample data
  const tenant = {
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john.doe@example.com',
    moveInDate: '2025-01-15'
  };

  const payment = {
    status: 'Paid',
    dueDate: '2025-04-05',
    amount: '₹15,000'
  };

  const facilities = ['AC', 'Attached Bathroom', 'WiFi', 'TV'];

  const maintenance = [
    { date: '2025-03-20', description: 'AC Servicing' },
    { date: '2025-02-15', description: 'Plumbing Repair' }
  ];

  return (
    <ScrollView style={tw`p-4`}>
      <View style={tw`bg-white p-6 rounded-lg shadow`}>
        <Text style={tw`text-2xl font-bold mb-4`}>Room Details</Text>

        {/* Basic Info */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Basic Information</Text>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-700`}>Room Number:</Text>
            <Text style={tw`text-gray-700 font-medium`}>{room.id}</Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-gray-700`}>Status:</Text>
            <Text style={tw`text-gray-700 font-medium`}>{room.status}</Text>
          </View>
        </View>

        {/* Tenant Info */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Tenant Information</Text>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-700`}>Name:</Text>
            <Text style={tw`text-gray-700 font-medium`}>{tenant.name}</Text>
          </View>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-700`}>Phone:</Text>
            <Text style={tw`text-gray-700 font-medium`}>{tenant.phone}</Text>
          </View>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-700`}>Email:</Text>
            <Text style={tw`text-gray-700 font-medium`}>{tenant.email}</Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-gray-700`}>Move-in Date:</Text>
            <Text style={tw`text-gray-700 font-medium`}>{tenant.moveInDate}</Text>
          </View>
        </View>

        {/* Payment Info */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Payment Status</Text>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-700`}>Status:</Text>
            <Text style={[tw`font-medium`, payment.status === 'Paid' ? tw`text-green-600` : tw`text-red-600`]}>
              {payment.status}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-700`}>Due Date:</Text>
            <Text style={tw`text-gray-700 font-medium`}>{payment.dueDate}</Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-gray-700`}>Amount:</Text>
            <Text style={tw`text-gray-700 font-medium`}>{payment.amount}</Text>
          </View>
        </View>

        {/* Facilities */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Room Facilities</Text>
          <View style={tw`flex-row flex-wrap`}>
            {facilities.map((facility, index) => (
              <View key={index} style={tw`bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2`}>
                <Text style={tw`text-gray-700`}>{facility}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Maintenance */}
        <View>
          <Text style={tw`text-lg font-semibold mb-2`}>Maintenance History</Text>
          {maintenance.map((item, index) => (
            <View key={index} style={tw`mb-3`}>
              <Text style={tw`text-gray-500 text-sm`}>{item.date}</Text>
              <Text style={tw`text-gray-700`}>{item.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default RoomDetails;
