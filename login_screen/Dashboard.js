import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; 
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

const Dashboard = ({ navigation }) => {
  const [floors, setFloors] = useState([]);
  const [newFloor, setNewFloor] = useState('');

  const handleAddFloor = () => {
    if (newFloor.trim()) {
      setFloors([...floors, { id: Date.now(), number: newFloor }]);
      setNewFloor('');
    }
  };

  const handleEditFloor = (id, newNumber) => {
    setFloors(floors.map(floor => 
      floor.id === id ? { ...floor, number: newNumber } : floor
    ));
  };

  const handleDeleteFloor = (id) => {
    setFloors(floors.filter(floor => floor.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>  
        <Entypo name="user" size={30} color="black" style={styles.profileIcon} /> 
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity>
        <MaterialCommunityIcons name="bell-ring" size={30} color="black" style={styles.profileIcon}/>
        </TouchableOpacity>
      </View>

      {/* Metrics Grid */}
      <ScrollView style={styles.metricsContainer}>
        <View style={styles.metricsGrid}>
          <MetricCard title="Properties" value="5" />
          <MetricCard title="Rooms" value="120" />
          <MetricCard title="Beds" value="240" />
          <MetricCard title="Occupancy" value="75%" />
          <MetricCard title="Property Count" value="10" />
          <MetricCard title="Total Room Count" value="50" />
          <MetricCard title="Total Beds Count" value="100" />
          <MetricCard title="Beds Filled" value="80" />
          <MetricCard title="Beds Vacant" value="20" />
          <MetricCard title="Notice Period" value="30 days" />
          <MetricCard title="Total Payment Received" value="₹1,00,000" />
          <MetricCard title="Payment Pending" value="₹20,000" />

          {/* Floor Management */}
          <View style={styles.floorManagementContainer}>
            <Text style={styles.sectionTitle}>Floor Management</Text>
            <View style={styles.floorInputContainer}>
              <TextInput
                style={styles.floorInput}
                placeholder="Enter floor number"
                value={newFloor}
                onChangeText={setNewFloor}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddFloor}>
                <Text style={styles.addButtonText}>+ Add Floor</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.floorList}>
              {floors.map(floor => (
                <View key={floor.id} style={styles.floorItem}>
                  <Text style={styles.floorNumber}>{floor.number}</Text>
                  <View style={styles.floorActions}>
                    <TouchableOpacity onPress={() => handleEditFloor(floor.id, prompt('Enter new floor number', floor.number))}>
                      <Text style={styles.actionIcon}>✏️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteFloor(floor.id)}>
                      <Text style={styles.actionIcon}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* PG Registration Button */}
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('PgRegistration')}>
          <Text style={styles.registerButtonText}>Register New PG</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
  <NavItem 
    icon={<MaterialCommunityIcons name="view-dashboard" size={30} color="black" />} 
    label="Dashboard" 
    onPress={() => navigation.navigate("Dashboard")} 
  />
  <NavItem 
    icon={<FontAwesome6 name="building-user" size={30} color="black" />} 
    label="Manage PG" 
    onPress={() => navigation.navigate("PgRegistration")} 
  />
  <NavItem 
    icon={<FontAwesome name="bed" size={30} color="black" />} 
    label="Rooms" 
    onPress={() => navigation.navigate("Rooms")} 
  />
  <NavItem 
    icon={<FontAwesome6 name="ticket" size={30} color="black" />} 
    label="Tickets" 
    onPress={() => navigation.navigate("Tickets")} 
  />
  <NavItem 
    icon={<MaterialCommunityIcons name="home-account" size={30} color="black" />} 
    label="Tenants" 
    onPress={() => navigation.navigate("AddTenant")} 
  />
</View>

    </View>
  );
};

const MetricCard = ({ title, value }) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricTitle}>{title}</Text>
  </View>
);

const NavItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Text style={styles.navIcon}>{icon}</Text>
    <Text style={styles.navLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationIcon: {
    fontSize: 24,
  },
  metricsContainer: {
    flex: 1,
    padding: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#333333',
  },
  metricTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
  },
  registerButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center', 
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  navIcon: {
    fontSize: 30,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 5,
    color: '#333333',
  },
  floorManagementContainer: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  floorInputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  floorInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  floorList: {
    maxHeight: 200,
  },
  floorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  floorNumber: {
    fontSize: 16,
    color: '#333333',
  },
  floorActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionIcon: {
    fontSize: 18,
  },
});

export default Dashboard;
