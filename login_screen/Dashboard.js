import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; 
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
            <Ionicons name="person-circle" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Search Bar */}
      <SearchBarSection />

      {/* Spacing after Search Bar */}
      <View style={{ height: 15 }} />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        {/* First Metrics Box */}
        <View style={styles.metricsBox}>
          <View style={styles.metricsGrid}>
            <MetricCard title="Properties" value="5" />
            <MetricCard title="Total Rooms" value="120" />
            <MetricCard title="Total Beds" value="240" />
            <MetricCard title="Occupancy" value="75" />
            <MetricCard title="Vacant Beds" value="10" />
            <TouchableOpacity style={[styles.metricCard, styles.metricCardRegister]} onPress={() => navigation.navigate('PgRegistration')}>
              <Text style={styles.registerButtonText}>Register New PG</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Spacing */}
        <View style={{ height: 20 }} />

        {/* Second Metrics Box */}
        <View style={styles.metricsBox}>
          <View style={styles.metricsGrid}>
            <MetricCard title="Amount Paid " value={50}/>
            <MetricCard title="amount pending" value={60} />
            <MetricCard title="total amount " value={100}  />
             
          </View>
        </View>

        {/* Beds Availability Stats */}
        <View style={styles.bedsAvailabilityContainer}>
          <View style={styles.bedsAvailabilityHeader}>
            <Text style={styles.sectionTitle}>Beds Availability</Text>
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('BedsAvailability')}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={14} color="#0089fa" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.bedsStatsContainer}>
            <TouchableOpacity 
              style={[styles.bedStatCard, styles.vacantBedCard]}
              onPress={() => navigation.navigate('BedsAvailability', { initialTab: 'vacant' })}
            >
              <View style={[styles.bedStatIconContainer, { backgroundColor: '#E8F5E9' }]}>
                <MaterialCommunityIcons name="bed-empty" size={24} color="#43A047" />
              </View>
              <Text style={styles.bedStatCount}>8</Text>
              <Text style={styles.bedStatLabel}>Vacant</Text>
              <View style={styles.vacantBedDetails}>
                <Text style={styles.vacantBedText}>Tap to view details</Text>
                <Ionicons name="arrow-forward" size={14} color="#43A047" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.bedStatCard}
              onPress={() => navigation.navigate('BedsAvailability', { initialTab: 'occupied' })}
            >
              <View style={[styles.bedStatIconContainer, { backgroundColor: '#E3F2FD' }]}>
                <MaterialCommunityIcons name="bed" size={24} color="#1976D2" />
              </View>
              <Text style={styles.bedStatCount}>42</Text>
              <Text style={styles.bedStatLabel}>Occupied</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.bedStatCard}
              onPress={() => navigation.navigate('BedsAvailability', { initialTab: 'notice' })}
            >
              <View style={[styles.bedStatIconContainer, { backgroundColor: '#FFEBEE' }]}>
                <Ionicons name="notifications" size={24} color="#E53935" />
              </View>
              <Text style={styles.bedStatCount}>5</Text>
              <Text style={styles.bedStatLabel}>Under Notice</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
          <NavItem 
          icon={<MaterialCommunityIcons name="view-dashboard" size={30} color="black" />} 
          label="Dashboard" 
          onPress={() => navigation.navigate("Dashboard")} />
          <NavItem 
          icon={<FontAwesome6 name="building-user" size={30} color="black" />} 
          label="Manage PG" 
          onPress={() => navigation.navigate("PgListScreen")} />
          <NavItem 
          icon={<FontAwesome name="bed" size={30} color="black" />} 
          label="Rooms" 
          onPress={() => navigation.navigate("Rooms")} />
          <NavItem 
          icon={<FontAwesome6 name="ticket" size={30} color="black" />} 
          label="Reports" 
          onPress={() => navigation.navigate("Reports")} />
          <NavItem 
          icon={<MaterialCommunityIcons name="home-account" size={30} color="black" />} 
          label="Tenants" 
          onPress={() => navigation.navigate("AddTenant")} />
        </View>
      </View>
    </View>
  );
};

// Metric Card Component
const MetricCard = ({ title, value }) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricTitle} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
  </View>
);

// Navigation Button Component
const NavItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Text style={styles.navIcon}>{icon}</Text>
    <Text style={styles.navLabel}>{label}</Text>
  </TouchableOpacity>
);

// Search Bar Component
const SearchBarSection = () => (
  <View style={styles.searchSection}>
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#666666" />
      <TextInput style={styles.searchInput} placeholder="Search Properties" placeholderTextColor="#666666" />
    </View> 
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 16,
    paddingTop: StatusBar.currentHeight + 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 8,
  },
  metricsBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', 
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '95%', 
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  metricCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    padding: 4,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricCardRegister: {
    backgroundColor: 'white',
  },
  metricTitle: {
    textAlign: 'center',
  },
  searchSection: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bedsAvailabilityContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bedsAvailabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bedsStatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bedStatCard: {
    alignItems: 'center',
    width: '30%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  bedStatIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  bedStatCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bedStatLabel: {
    fontSize: 13,
    color: '#666',
  },
  vacantBedCard: {
    width: '47%',
    backgroundColor: '#f0faf0',
    borderWidth: 1,
    borderColor: '#c8e6c9',
    padding: 15,
  },
  vacantBedDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,
    width: '100%',
  },
  vacantBedText: {
    fontSize: 12,
    color: '#43A047',
    fontWeight: '500',
  },
});

export default Dashboard;
