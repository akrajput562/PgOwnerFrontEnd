import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  FlatList,
  Image
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const BedsAvailability = ({ route, navigation }) => {
  const initialTabFromRoute = route.params?.initialTab || 'vacant';
  const [activeTab, setActiveTab] = useState(initialTabFromRoute);
  const [searchQuery, setSearchQuery] = useState('');
  const [bedsData, setBedsData] = useState({
    vacant: [
      { id: 'v1', roomNo: '101', bedNo: 'A', type: 'Single', rent: '₹6,500', pgName: 'Sunshine PG', location: 'Koramangala' },
      { id: 'v2', roomNo: '102', bedNo: 'B', type: 'Single', rent: '₹6,000', pgName: 'Sunshine PG', location: 'Koramangala' },
      { id: 'v3', roomNo: '203', bedNo: 'A', type: 'Double', rent: '₹5,500', pgName: 'Green Valley PG', location: 'HSR Layout' },
      { id: 'v4', roomNo: '205', bedNo: 'C', type: 'Triple', rent: '₹4,800', pgName: 'Green Valley PG', location: 'HSR Layout' },
      { id: 'v5', roomNo: '302', bedNo: 'B', type: 'Single', rent: '₹7,200', pgName: 'Sunshine PG', location: 'Koramangala' },
    ],
    occupied: [
      { id: 'o1', roomNo: '101', bedNo: 'B', type: 'Single', rent: '₹6,500', tenant: 'John Doe', joinDate: '12 Jan 2023', pgName: 'Sunshine PG' },
      { id: 'o2', roomNo: '101', bedNo: 'C', type: 'Single', rent: '₹6,500', tenant: 'Alice Smith', joinDate: '15 Feb 2023', pgName: 'Sunshine PG' },
      { id: 'o3', roomNo: '103', bedNo: 'A', type: 'Double', rent: '₹5,500', tenant: 'Bob Johnson', joinDate: '10 Mar 2023', pgName: 'Sunshine PG' },
      { id: 'o4', roomNo: '201', bedNo: 'A', type: 'Single', rent: '₹6,000', tenant: 'Emma Wilson', joinDate: '05 Apr 2023', pgName: 'Green Valley PG' },
      { id: 'o5', roomNo: '204', bedNo: 'B', type: 'Triple', rent: '₹4,800', tenant: 'Mike Brown', joinDate: '20 Mar 2023', pgName: 'Green Valley PG' },
    ],
    notice: [
      { id: 'n1', roomNo: '102', bedNo: 'A', type: 'Single', rent: '₹6,000', tenant: 'Sarah Davis', leaveDate: '30 Apr 2023', pgName: 'Sunshine PG' },
      { id: 'n2', roomNo: '203', bedNo: 'B', type: 'Double', rent: '₹5,500', tenant: 'Tom Wilson', leaveDate: '15 May 2023', pgName: 'Green Valley PG' },
      { id: 'n3', roomNo: '301', bedNo: 'C', type: 'Triple', rent: '₹4,800', tenant: 'Jane Miller', leaveDate: '20 Apr 2023', pgName: 'Sunshine PG' },
    ]
  });

  useEffect(() => {
    if (route.params?.initialTab) {
      setActiveTab(route.params.initialTab);
    }
  }, [route.params?.initialTab]);

  const filteredBeds = () => {
    const beds = bedsData[activeTab] || [];
    if (!searchQuery) return beds;
    
    return beds.filter(bed => {
      const searchLower = searchQuery.toLowerCase();
      if (activeTab === 'vacant') {
        return (
          bed.roomNo.toLowerCase().includes(searchLower) ||
          bed.bedNo.toLowerCase().includes(searchLower) ||
          bed.type.toLowerCase().includes(searchLower) ||
          bed.rent.toLowerCase().includes(searchLower) ||
          bed.pgName.toLowerCase().includes(searchLower) ||
          bed.location.toLowerCase().includes(searchLower)
        );
      } else if (activeTab === 'occupied') {
        return (
          bed.roomNo.toLowerCase().includes(searchLower) ||
          bed.bedNo.toLowerCase().includes(searchLower) ||
          bed.type.toLowerCase().includes(searchLower) ||
          bed.rent.toLowerCase().includes(searchLower) ||
          bed.tenant.toLowerCase().includes(searchLower) ||
          bed.pgName.toLowerCase().includes(searchLower)
        );
      } else { // notice
        return (
          bed.roomNo.toLowerCase().includes(searchLower) ||
          bed.bedNo.toLowerCase().includes(searchLower) ||
          bed.type.toLowerCase().includes(searchLower) ||
          bed.rent.toLowerCase().includes(searchLower) ||
          bed.tenant.toLowerCase().includes(searchLower) ||
          bed.pgName.toLowerCase().includes(searchLower)
        );
      }
    });
  };

  const handleAddTenant = (bed) => {
    // Navigate to add tenant screen with bed details
    navigation.navigate('AddTenant', { bedDetails: bed });
  };

  const handleViewDetails = (bed) => {
    // Navigate to bed details screen
    // This could be a tenant details screen for occupied/notice beds
    // or a room details screen for vacant beds
    if (activeTab === 'occupied' || activeTab === 'notice') {
      // For simplicity, just using the tenant name as a parameter
      navigation.navigate('RoomDetails', { 
        roomId: bed.roomNo,
        bedId: bed.bedNo,
        tenant: bed.tenant
      });
    } else {
      navigation.navigate('RoomDetails', { 
        roomId: bed.roomNo,
        bedId: bed.bedNo
      });
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Beds Availability</Text>
      <View style={{ width: 24 }} />
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'vacant' && styles.activeTabButton]}
        onPress={() => setActiveTab('vacant')}
      >
        <MaterialCommunityIcons 
          name="bed-empty" 
          size={20} 
          color={activeTab === 'vacant' ? '#1976D2' : '#666'} 
          style={styles.tabIcon} 
        />
        <Text style={[styles.tabText, activeTab === 'vacant' && styles.activeTabText]}>
          Vacant ({bedsData.vacant.length})
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'occupied' && styles.activeTabButton]}
        onPress={() => setActiveTab('occupied')}
      >
        <MaterialCommunityIcons 
          name="bed" 
          size={20} 
          color={activeTab === 'occupied' ? '#43A047' : '#666'} 
          style={styles.tabIcon} 
        />
        <Text style={[styles.tabText, activeTab === 'occupied' && styles.activeTabText]}>
          Occupied ({bedsData.occupied.length})
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'notice' && styles.activeTabButton]}
        onPress={() => setActiveTab('notice')}
      >
        <MaterialIcons 
          name="notification-important" 
          size={20} 
          color={activeTab === 'notice' ? '#E53935' : '#666'} 
          style={styles.tabIcon} 
        />
        <Text style={[styles.tabText, activeTab === 'notice' && styles.activeTabText]}>
          Notice ({bedsData.notice.length})
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={`Search ${activeTab} beds...`}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
      />
      {searchQuery ? (
        <TouchableOpacity onPress={() => setSearchQuery('')}>
          <Ionicons name="close-circle" size={20} color="#666" />
        </TouchableOpacity>
      ) : null}
    </View>
  );

  const renderVacantBed = ({ item }) => (
    <View style={styles.bedCard}>
      <View style={styles.bedInfoContainer}>
        <View style={styles.bedHeader}>
          <View style={styles.roomInfo}>
            <Text style={styles.roomText}>Room {item.roomNo}</Text>
            <View style={styles.bedBadge}>
              <Text style={styles.bedBadgeText}>Bed {item.bedNo}</Text>
            </View>
            <View style={[styles.typeBadge, styles.vacantTypeBadge]}>
              <Text style={styles.typeBadgeText}>{item.type}</Text>
            </View>
          </View>
          <Text style={styles.rentText}>{item.rent}/mo</Text>
        </View>
        
        <View style={styles.pgInfoContainer}>
          <Ionicons name="business-outline" size={14} color="#666" style={{ marginRight: 4 }} />
          <Text style={styles.pgNameText}>{item.pgName} • {item.location}</Text>
        </View>
        
        <View style={styles.bedActions}>
          <TouchableOpacity 
            style={[styles.bedActionButton, styles.viewButton]}
            onPress={() => handleViewDetails(item)}
          >
            <Ionicons name="eye-outline" size={16} color="#1976D2" style={styles.actionIcon} />
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.bedActionButton, styles.addTenantButton]}
            onPress={() => handleAddTenant(item)}
          >
            <Ionicons name="person-add-outline" size={16} color="#43A047" style={styles.actionIcon} />
            <Text style={styles.addTenantButtonText}>Add Tenant</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderOccupiedBed = ({ item }) => (
    <View style={styles.bedCard}>
      <View style={styles.bedInfoContainer}>
        <View style={styles.bedHeader}>
          <View style={styles.roomInfo}>
            <Text style={styles.roomText}>Room {item.roomNo}</Text>
            <View style={styles.bedBadge}>
              <Text style={styles.bedBadgeText}>Bed {item.bedNo}</Text>
            </View>
            <View style={[styles.typeBadge, styles.occupiedTypeBadge]}>
              <Text style={styles.typeBadgeText}>{item.type}</Text>
            </View>
          </View>
          <Text style={styles.rentText}>{item.rent}/mo</Text>
        </View>
        
        <View style={styles.tenantInfoContainer}>
          <View style={styles.tenantAvatarContainer}>
            <Text style={styles.tenantAvatar}>{item.tenant.charAt(0)}</Text>
          </View>
          <View style={styles.tenantDetails}>
            <Text style={styles.tenantName}>{item.tenant}</Text>
            <Text style={styles.tenantDate}>Joined: {item.joinDate}</Text>
          </View>
        </View>
        
        <View style={styles.pgInfoContainer}>
          <Ionicons name="business-outline" size={14} color="#666" style={{ marginRight: 4 }} />
          <Text style={styles.pgNameText}>{item.pgName}</Text>
        </View>
        
        <View style={styles.bedActions}>
          <TouchableOpacity 
            style={[styles.bedActionButton, styles.viewButton]}
            onPress={() => handleViewDetails(item)}
          >
            <Ionicons name="eye-outline" size={16} color="#1976D2" style={styles.actionIcon} />
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.bedActionButton, styles.markNoticeButton]}
          >
            <MaterialIcons name="notification-important" size={16} color="#E53935" style={styles.actionIcon} />
            <Text style={styles.markNoticeButtonText}>Mark Notice</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderNoticeBed = ({ item }) => (
    <View style={styles.bedCard}>
      <View style={styles.bedInfoContainer}>
        <View style={styles.bedHeader}>
          <View style={styles.roomInfo}>
            <Text style={styles.roomText}>Room {item.roomNo}</Text>
            <View style={styles.bedBadge}>
              <Text style={styles.bedBadgeText}>Bed {item.bedNo}</Text>
            </View>
            <View style={[styles.typeBadge, styles.noticeTypeBadge]}>
              <Text style={styles.typeBadgeText}>{item.type}</Text>
            </View>
          </View>
          <Text style={styles.rentText}>{item.rent}/mo</Text>
        </View>
        
        <View style={styles.tenantInfoContainer}>
          <View style={styles.tenantAvatarContainer}>
            <Text style={styles.tenantAvatar}>{item.tenant.charAt(0)}</Text>
          </View>
          <View style={styles.tenantDetails}>
            <Text style={styles.tenantName}>{item.tenant}</Text>
            <Text style={styles.tenantDate}>Leaving: {item.leaveDate}</Text>
          </View>
        </View>
        
        <View style={styles.pgInfoContainer}>
          <Ionicons name="business-outline" size={14} color="#666" style={{ marginRight: 4 }} />
          <Text style={styles.pgNameText}>{item.pgName}</Text>
        </View>
        
        <View style={styles.bedActions}>
          <TouchableOpacity 
            style={[styles.bedActionButton, styles.viewButton]}
            onPress={() => handleViewDetails(item)}
          >
            <Ionicons name="eye-outline" size={16} color="#1976D2" style={styles.actionIcon} />
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.bedActionButton, styles.vacateButton]}
          >
            <MaterialCommunityIcons name="exit-to-app" size={16} color="#FB8C00" style={styles.actionIcon} />
            <Text style={styles.vacateButtonText}>Vacate Bed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons 
        name={activeTab === 'vacant' ? 'bed-empty' : activeTab === 'occupied' ? 'bed' : 'bell-ring-outline'} 
        size={60} 
        color="#ccc" 
      />
      <Text style={styles.emptyText}>No {activeTab} beds found</Text>
      {searchQuery ? (
        <Text style={styles.emptySubtext}>Try a different search term</Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <View style={styles.contentContainer}>
        {renderTabs()}
        {renderSearchBar()}
        
        <FlatList
          data={filteredBeds()}
          keyExtractor={(item) => item.id}
          renderItem={
            activeTab === 'vacant' 
              ? renderVacantBed 
              : activeTab === 'occupied' 
                ? renderOccupiedBed 
                : renderNoticeBed
          }
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyList}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: '#f5f5f5',
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 16,
  },
  bedCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  bedInfoContainer: {
    padding: 16,
  },
  bedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  roomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  bedBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  bedBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976D2',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  vacantTypeBadge: {
    backgroundColor: '#E8F5E9',
  },
  occupiedTypeBadge: {
    backgroundColor: '#FFF3E0',
  },
  noticeTypeBadge: {
    backgroundColor: '#FFEBEE',
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  rentText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  pgInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pgNameText: {
    fontSize: 14,
    color: '#666',
  },
  tenantInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tenantAvatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tenantAvatar: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  tenantDetails: {
    flex: 1,
  },
  tenantName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  tenantDate: {
    fontSize: 13,
    color: '#666',
  },
  bedActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  bedActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  actionIcon: {
    marginRight: 6,
  },
  viewButton: {
    backgroundColor: '#E3F2FD',
  },
  addTenantButton: {
    backgroundColor: '#E8F5E9',
  },
  markNoticeButton: {
    backgroundColor: '#FFEBEE',
  },
  vacateButton: {
    backgroundColor: '#FFF3E0',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
  },
  addTenantButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#43A047',
  },
  markNoticeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E53935',
  },
  vacateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FB8C00',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  }
});

export default BedsAvailability; 