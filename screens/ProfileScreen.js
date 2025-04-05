import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  StatusBar
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john.doe@example.com',
    pgProperties: [
      {
        name: 'Sunshine PG',
        location: 'Koramangala, Bangalore',
        totalRooms: 25,
        filledBeds: 42,
        vacantBeds: 8,
        bedsUnderNotice: 3,
        pendingRent: 28500,
        totalEarnings: 125000
      },
      {
        name: 'Green Valley PG',
        location: 'HSR Layout, Bangalore',
        totalRooms: 18,
        filledBeds: 30,
        vacantBeds: 6,
        bedsUnderNotice: 2,
        pendingRent: 22000,
        totalEarnings: 95000
      }
    ]
  });
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);
  
  const totalPropertyCount = userData.pgProperties.length;
  const activeProperty = userData.pgProperties[activePropertyIndex];
  
  // Calculate totals across all properties
  const totalRooms = userData.pgProperties.reduce((sum, property) => sum + property.totalRooms, 0);
  const totalFilledBeds = userData.pgProperties.reduce((sum, property) => sum + property.filledBeds, 0);
  const totalVacantBeds = userData.pgProperties.reduce((sum, property) => sum + property.vacantBeds, 0);
  const totalBedsUnderNotice = userData.pgProperties.reduce((sum, property) => sum + property.bedsUnderNotice, 0);
  const totalPendingRent = userData.pgProperties.reduce((sum, property) => sum + property.pendingRent, 0);
  const totalEarnings = userData.pgProperties.reduce((sum, property) => sum + property.totalEarnings, 0);

  // Handle profile image selection
  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera roll permissions to change your profile picture.');
        return;
      }
      
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      
      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.multiRemove(['user_token', 'user_id', 'user_data']);
      
      // Navigate to Login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const handleChangeProperty = (index) => {
    if (index >= 0 && index < totalPropertyCount) {
      setActivePropertyIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { userData })}>
          <Ionicons name="create-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={[styles.profileImage, styles.defaultAvatarContainer]}>
                <Ionicons name="person" size={60} color="#bbb" />
              </View>
            )}
            <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
              <Ionicons name="camera" size={18} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.profileName}>{userData.name}</Text>
          
          <View style={styles.profileInfoItem}>
            <Ionicons name="call-outline" size={18} color="#666" style={styles.infoIcon} />
            <Text style={styles.profileInfoText}>{userData.phone}</Text>
          </View>
          
          <View style={styles.profileInfoItem}>
            <Ionicons name="mail-outline" size={18} color="#666" style={styles.infoIcon} />
            <Text style={styles.profileInfoText}>{userData.email}</Text>
          </View>
          
          <View style={styles.propertyCounter}>
            <Text style={styles.propertyCount}>{totalPropertyCount}</Text>
            <Text style={styles.propertyCountLabel}>PG Properties</Text>
          </View>
        </View>

        {/* Property Overview */}
        <View style={styles.propertyOverviewSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Property Overview</Text>
            {totalPropertyCount > 1 && (
              <View style={styles.propertyNavigation}>
                <TouchableOpacity 
                  onPress={() => handleChangeProperty(activePropertyIndex - 1)}
                  disabled={activePropertyIndex === 0}
                  style={[styles.propertyNavButton, activePropertyIndex === 0 ? styles.disabledButton : null]}
                >
                  <Ionicons name="chevron-back" size={20} color={activePropertyIndex === 0 ? "#bbb" : "#1976D2"} />
                </TouchableOpacity>
                <Text style={styles.propertyNavText}>
                  {activePropertyIndex + 1} of {totalPropertyCount}
                </Text>
                <TouchableOpacity 
                  onPress={() => handleChangeProperty(activePropertyIndex + 1)}
                  disabled={activePropertyIndex === totalPropertyCount - 1}
                  style={[styles.propertyNavButton, activePropertyIndex === totalPropertyCount - 1 ? styles.disabledButton : null]}
                >
                  <Ionicons name="chevron-forward" size={20} color={activePropertyIndex === totalPropertyCount - 1 ? "#bbb" : "#1976D2"} />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.propertyHeader}>
            <Text style={styles.propertyName}>{activeProperty.name}</Text>
            <Text style={styles.propertyLocation}>
              <Ionicons name="location-outline" size={14} color="#666" /> {activeProperty.location}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <View style={[styles.statItem, styles.statItemBlue]}>
                <View style={styles.statIconContainer}>
                  <MaterialCommunityIcons name="door" size={22} color="#1976D2" />
                </View>
                <Text style={styles.statValue}>{activeProperty.totalRooms}</Text>
                <Text style={styles.statLabel}>Total Rooms</Text>
              </View>
              
              <View style={[styles.statItem, styles.statItemGreen]}>
                <View style={styles.statIconContainer}>
                  <MaterialCommunityIcons name="bed" size={22} color="#43A047" />
                </View>
                <Text style={styles.statValue}>{activeProperty.filledBeds}</Text>
                <Text style={styles.statLabel}>Filled Beds</Text>
              </View>
            </View>
            
            <View style={styles.statRow}>
              <View style={[styles.statItem, styles.statItemOrange]}>
                <View style={styles.statIconContainer}>
                  <MaterialCommunityIcons name="bed-empty" size={22} color="#FB8C00" />
                </View>
                <Text style={styles.statValue}>{activeProperty.vacantBeds}</Text>
                <Text style={styles.statLabel}>Vacant Beds</Text>
              </View>
              
              <View style={[styles.statItem, styles.statItemRed]}>
                <View style={styles.statIconContainer}>
                  <MaterialCommunityIcons name="bell-ring-outline" size={22} color="#E53935" />
                </View>
                <Text style={styles.statValue}>{activeProperty.bedsUnderNotice}</Text>
                <Text style={styles.statLabel}>Under Notice</Text>
              </View>
            </View>
          </View>

          <View style={styles.financialContainer}>
            <View style={styles.financialItem}>
              <Text style={styles.financialLabel}>Pending Rent</Text>
              <Text style={styles.financialValue}>₹{activeProperty.pendingRent.toLocaleString()}</Text>
            </View>
            <View style={styles.financialDivider} />
            <View style={styles.financialItem}>
              <Text style={styles.financialLabel}>Total Earnings</Text>
              <Text style={styles.financialValue}>₹{activeProperty.totalEarnings.toLocaleString()}</Text>
            </View>
          </View>

          {totalPropertyCount > 1 && (
            <TouchableOpacity 
              style={styles.viewAllButton} 
              onPress={() => navigation.navigate('AllProperties', { properties: userData.pgProperties })}
            >
              <Text style={styles.viewAllButtonText}>View All Properties</Text>
              <Ionicons name="chevron-forward" size={16} color="#1976D2" />
            </TouchableOpacity>
          )}
        </View>

        {/* Total Aggregates Section */}
        <View style={styles.aggregateSection}>
          <Text style={styles.aggregateTitle}>Total Across All Properties</Text>
          
          <View style={styles.aggregateRow}>
            <View style={styles.aggregateItem}>
              <Text style={styles.aggregateValue}>{totalRooms}</Text>
              <Text style={styles.aggregateLabel}>Rooms</Text>
            </View>
            <View style={styles.aggregateItem}>
              <Text style={styles.aggregateValue}>{totalFilledBeds}</Text>
              <Text style={styles.aggregateLabel}>Filled</Text>
            </View>
            <View style={styles.aggregateItem}>
              <Text style={styles.aggregateValue}>{totalVacantBeds}</Text>
              <Text style={styles.aggregateLabel}>Vacant</Text>
            </View>
            <View style={styles.aggregateItem}>
              <Text style={styles.aggregateValue}>{totalBedsUnderNotice}</Text>
              <Text style={styles.aggregateLabel}>Notice</Text>
            </View>
          </View>
          
          <View style={styles.totalFinancials}>
            <View style={styles.totalFinancialItem}>
              <MaterialIcons name="payments" size={24} color="#E53935" />
              <View style={styles.totalFinancialTextContainer}>
                <Text style={styles.totalFinancialLabel}>Total Pending</Text>
                <Text style={styles.totalFinancialValue}>₹{totalPendingRent.toLocaleString()}</Text>
              </View>
            </View>
            
            <View style={styles.totalFinancialItem}>
              <MaterialIcons name="account-balance-wallet" size={24} color="#43A047" />
              <View style={styles.totalFinancialTextContainer}>
                <Text style={styles.totalFinancialLabel}>Total Earnings</Text>
                <Text style={styles.totalFinancialValue}>₹{totalEarnings.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Management Actions */}
        <View style={styles.actionSection}>
          <Text style={styles.sectionTitle}>Management Actions</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => navigation.navigate('EditProfile', { userData })}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="person" size={24} color="#1976D2" />
              </View>
              <Text style={styles.actionButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => navigation.navigate('PgRegistration')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: '#E8F5E9' }]}>
                <Ionicons name="add-circle" size={24} color="#43A047" />
              </View>
              <Text style={styles.actionButtonText}>Add Property</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => navigation.navigate('AddTenant')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: '#FFF3E0' }]}>
                <MaterialIcons name="people-alt" size={24} color="#FB8C00" />
              </View>
              <Text style={styles.actionButtonText}>View Tenants</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => navigation.navigate('Reports')}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: '#E8EAF6' }]}>
                <MaterialIcons name="payments" size={24} color="#3949AB" />
              </View>
              <Text style={styles.actionButtonText}>Payments</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={() => setLogoutModalVisible(true)}
      >
        <Ionicons name="log-out" size={20} color="white" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="log-out" size={32} color="#E53935" />
            </View>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalLogoutButton}
                onPress={() => {
                  setLogoutModalVisible(false);
                  handleLogout();
                }}
              >
                <Text style={styles.modalLogoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#1976D2',
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  defaultAvatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#1976D2',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  profileInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoIcon: {
    marginRight: 8,
  },
  profileInfoText: {
    fontSize: 16,
    color: '#666',
  },
  propertyCounter: {
    marginTop: 16,
    backgroundColor: '#E3F2FD',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  propertyCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  propertyCountLabel: {
    fontSize: 14,
    color: '#666',
  },
  propertyOverviewSection: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  propertyNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyNavButton: {
    padding: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  propertyNavText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: '#666',
  },
  propertyHeader: {
    marginBottom: 16,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  statItemBlue: {
    backgroundColor: '#E3F2FD',
  },
  statItemGreen: {
    backgroundColor: '#E8F5E9',
  },
  statItemOrange: {
    backgroundColor: '#FFF3E0',
  },
  statItemRed: {
    backgroundColor: '#FFEBEE',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  financialContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  financialItem: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  financialDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  financialLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  financialValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  viewAllButtonText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
    marginRight: 4,
  },
  aggregateSection: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  aggregateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  aggregateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  aggregateItem: {
    alignItems: 'center',
    width: '25%',
  },
  aggregateValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  aggregateLabel: {
    fontSize: 12,
    color: '#666',
  },
  totalFinancials: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
  },
  totalFinancialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalFinancialTextContainer: {
    marginLeft: 12,
  },
  totalFinancialLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalFinancialValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionSection: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 80, // Extra space for logout button
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#E53935',
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  modalIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalCancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    marginRight: 8,
  },
  modalCancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  modalLogoutButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#E53935',
    alignItems: 'center',
    marginLeft: 8,
  },
  modalLogoutButtonText: {
    color: 'white',
    fontWeight: '600',
  }
});

export default ProfileScreen; 