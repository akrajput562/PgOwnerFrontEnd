import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; 
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>  
        <Entypo name="user" size={30} color="black" style={styles.profileIcon} /> 
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity>
        <MaterialCommunityIcons name="bell-ring" size={30} color="black" style={styles.profileIcon}/>
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Ionicons name="chevron-down" size={16} color="white" />
        </View>
        
      </View>
      {/* Navigation Tabs */}
      <NavigationTabs />
      {/* Search Bar */}
      <SearchBarSection />

      {/* Metrics Grid */}
      <ScrollView style={styles.metricsContainer} contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.metricsGrid}>
          <MetricCard title="Properties" value="5" />
          <MetricCard title="Total Rooms" value="120" />
          <MetricCard title="Total Beds" value="240" />
          <MetricCard title="Occupancy" value="75" />
          <MetricCard title="Vacant Beds" value="10" />
          <MetricCard title="Notice Period" value="30 days" />
          <MetricCard title="Pending Amount" value="R.S.50000" />
          <MetricCard title="Recived  Amount" value="R.S.80000" />


          {/* Property Status Card */}
          <PropertyStatusCard />
        </View>

        {/* PG Registration Button */}
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('PgRegistration')}>
          <Text style={styles.registerButtonText}>Register New PG</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
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

const SearchBarSection = () => (
  <View style={styles.searchSection}>
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#666666" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search Properties"
        placeholderTextColor="#666666"
      />
    </View>
    <View style={styles.filterButtons}>
      {['Rooms', 'Tenants', 'Beds'].map((filter) => (
        <TouchableOpacity key={filter} style={styles.filterButton}>
          <Text style={styles.filterText}>{filter}</Text>
          <View style={[styles.statusIndicator, {backgroundColor: '#4CAF50'}]} />
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const PropertyStatusCard = () => {
  const statusItems = [
    {label: 'Filled Beds', icon: 'checkmark-circle', color: '#4CAF50', count: 12},
    {label: 'Vacant Beds', icon: 'close-circle', color: '#F44336', count: 3},
    {label: 'Under Notice', icon: 'alert-circle', color: '#FF9800', count: 2},
    {label: 'Tenants', icon: 'people', color: '#2196F3', count: 15},
    {label: 'Collection', icon: 'cash', color: '#4CAF50', count: '₹1,20,000'},
    {label: 'Leads', icon: 'megaphone', color: '#E91E63', count: 5},
    {label: 'Bookings', icon: 'calendar', color: '#FFC107', count: 3},
  ];

  return (
    <View style={styles.statusCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.ownerName}>John Doe</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>Current</Text>
        </View>
      </View>
      <Text style={styles.roomInfo}>3 Rooms | 15 Beds</Text>
      <View style={styles.statusList}>
        {statusItems.map((item) => (
          <View key={item.label} style={styles.statusItem}>
            <Ionicons name={item.icon} size={20} color={item.color} />
            <Text style={styles.statusLabel}>{item.label}</Text>
            <Text style={styles.statusCount}>{item.count}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.viewMoreButton}>
        <Text style={styles.viewMoreText}>View More</Text>
      </TouchableOpacity>
    </View>
  );
};

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const tabs = ['Dashboard', 'Rooms', 'Listing', 'Complaint', 'Food'];

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tabItem,
            activeTab === tab && styles.activeTab,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab && styles.activeTabText,
          ]}>
            {tab}
          </Text>
          {activeTab === tab && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

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
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  time: {
    color: 'white',
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
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navIcon: {
    fontSize: 30,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 5,
    color: '#333333',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  activeTab: {
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: -12,
    height: 2,
    width: '100%',
    backgroundColor: '#2196F3',
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
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  filterText: {
    marginRight: 8,
    color: '#666666',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusCard: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusBadgeText: {
    color: '#ffffff',
    fontSize: 12,
  },
  roomInfo: {
    color: '#666666',
    marginBottom: 16,
  },
  statusList: {
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusLabel: {
    flex: 1,
    marginLeft: 8,
    color: '#666666',
  },
  statusCount: {
    fontWeight: 'bold',
  },
  viewMoreButton: {
    alignItems: 'center',
    padding: 8,
  },
  viewMoreText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});

export default Dashboard;
