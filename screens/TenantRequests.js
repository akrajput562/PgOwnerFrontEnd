import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  TextInput,
  FlatList,
  Alert
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const TenantRequests = ({ route, navigation }) => {
  const initialTabFromRoute = route.params?.initialTab || 'pending';
  const [activeTab, setActiveTab] = useState(initialTabFromRoute);
  const [searchQuery, setSearchQuery] = useState('');
  const [requestsData, setRequestsData] = useState({
    pending: [
      { 
        id: 'p1', 
        name: 'Raj Kumar', 
        phone: '9876543210', 
        email: 'raj@example.com', 
        pgName: 'Green Valley PG',
        room: '101', 
        bed: 'A',
        requestDate: '15 Apr 2023',
        documents: ['ID Proof', 'Address Proof'],
        notes: 'Student at ABC College'
      },
      { 
        id: 'p2', 
        name: 'Anjali Singh', 
        phone: '9876543211', 
        email: 'anjali@example.com', 
        pgName: 'Sunshine PG',
        room: '203', 
        bed: 'B',
        requestDate: '18 Apr 2023',
        documents: ['ID Proof', 'College ID'],
        notes: 'Requires 6-month stay'
      },
      { 
        id: 'p3', 
        name: 'Vivek Sharma', 
        phone: '9876543212', 
        email: 'vivek@example.com', 
        pgName: 'Green Valley PG',
        room: '105', 
        bed: 'C',
        requestDate: '20 Apr 2023',
        documents: ['ID Proof', 'Company ID'],
        notes: 'Working professional'
      },
    ],
    approved: [
      { 
        id: 'a1', 
        name: 'Priya Patel', 
        phone: '9876543220', 
        email: 'priya@example.com', 
        pgName: 'Sunshine PG',
        room: '102', 
        bed: 'A',
        requestDate: '10 Apr 2023',
        approvalDate: '12 Apr 2023',
        moveInDate: '01 May 2023',
        documents: ['ID Proof', 'College ID'],
        notes: 'Student at XYZ College'
      },
      { 
        id: 'a2', 
        name: 'Rahul Gupta', 
        phone: '9876543221', 
        email: 'rahul@example.com', 
        pgName: 'Green Valley PG',
        room: '205', 
        bed: 'B',
        requestDate: '05 Apr 2023',
        approvalDate: '08 Apr 2023',
        moveInDate: '15 Apr 2023',
        documents: ['ID Proof', 'Company ID'],
        notes: 'Working at ABC Corp'
      },
    ],
    rejected: [
      { 
        id: 'r1', 
        name: 'Amit Joshi', 
        phone: '9876543230', 
        email: 'amit@example.com', 
        pgName: 'Sunshine PG',
        room: '104', 
        bed: 'B',
        requestDate: '08 Apr 2023',
        rejectionDate: '10 Apr 2023',
        reason: 'Incomplete documentation',
        notes: 'Missing address proof'
      },
      { 
        id: 'r2', 
        name: 'Neha Singh', 
        phone: '9876543231', 
        email: 'neha@example.com', 
        pgName: 'Green Valley PG',
        room: '302', 
        bed: 'A',
        requestDate: '12 Apr 2023',
        rejectionDate: '14 Apr 2023',
        reason: 'Short stay duration',
        notes: 'Only needed 1-month stay'
      },
    ]
  });

  useEffect(() => {
    if (route.params?.initialTab) {
      setActiveTab(route.params.initialTab);
    }
  }, [route.params?.initialTab]);

  const filteredRequests = () => {
    const requests = requestsData[activeTab] || [];
    if (!searchQuery) return requests;
    
    return requests.filter(request => {
      const searchLower = searchQuery.toLowerCase();
      return (
        request.name.toLowerCase().includes(searchLower) ||
        request.phone.toLowerCase().includes(searchLower) ||
        request.email.toLowerCase().includes(searchLower) ||
        request.pgName.toLowerCase().includes(searchLower) ||
        request.room.toLowerCase().includes(searchLower) ||
        (request.notes && request.notes.toLowerCase().includes(searchLower))
      );
    });
  };

  const handleApproveRequest = (request) => {
    Alert.alert(
      "Approve Request",
      `Are you sure you want to approve ${request.name}'s request?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Approve", 
          onPress: () => {
            // Move request from pending to approved
            const updatedPending = requestsData.pending.filter(item => item.id !== request.id);
            const approvedRequest = {
              ...request,
              approvalDate: new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              }),
              moveInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })
            };
            
            setRequestsData({
              ...requestsData,
              pending: updatedPending,
              approved: [...requestsData.approved, approvedRequest]
            });
            
            Alert.alert("Success", "Request approved successfully!");
          } 
        }
      ]
    );
  };

  const handleRejectRequest = (request) => {
    Alert.prompt(
      "Reject Request",
      `Please provide a reason for rejecting ${request.name}'s request:`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Reject",
          onPress: (reason) => {
            if (!reason) {
              Alert.alert("Error", "Please provide a rejection reason");
              return;
            }
            
            // Move request from pending to rejected
            const updatedPending = requestsData.pending.filter(item => item.id !== request.id);
            const rejectedRequest = {
              ...request,
              rejectionDate: new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              }),
              reason: reason
            };
            
            setRequestsData({
              ...requestsData,
              pending: updatedPending,
              rejected: [...requestsData.rejected, rejectedRequest]
            });
            
            Alert.alert("Success", "Request rejected");
          }
        }
      ],
      "plain-text"
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Tenant Requests</Text>
      <View style={{ width: 24 }} />
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'pending' && styles.activeTabButton]}
        onPress={() => setActiveTab('pending')}
      >
        <MaterialIcons 
          name="pending-actions" 
          size={20} 
          color={activeTab === 'pending' ? '#1976D2' : '#666'} 
          style={styles.tabIcon} 
        />
        <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>
          Pending ({requestsData.pending.length})
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'approved' && styles.activeTabButton]}
        onPress={() => setActiveTab('approved')}
      >
        <MaterialIcons 
          name="check-circle" 
          size={20} 
          color={activeTab === 'approved' ? '#43A047' : '#666'} 
          style={styles.tabIcon} 
        />
        <Text style={[styles.tabText, activeTab === 'approved' && styles.activeTabText]}>
          Approved ({requestsData.approved.length})
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'rejected' && styles.activeTabButton]}
        onPress={() => setActiveTab('rejected')}
      >
        <MaterialIcons 
          name="cancel" 
          size={20} 
          color={activeTab === 'rejected' ? '#E53935' : '#666'} 
          style={styles.tabIcon} 
        />
        <Text style={[styles.tabText, activeTab === 'rejected' && styles.activeTabText]}>
          Rejected ({requestsData.rejected.length})
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={`Search ${activeTab} requests...`}
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

  const renderPendingRequest = ({ item }) => (
    <View style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userDetails}>{item.phone}</Text>
            <Text style={styles.userDetails}>{item.email}</Text>
          </View>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Pending</Text>
        </View>
      </View>
      
      <View style={styles.requestDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>PG:</Text>
          <Text style={styles.detailValue}>{item.pgName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Room/Bed:</Text>
          <Text style={styles.detailValue}>Room {item.room}, Bed {item.bed}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Request Date:</Text>
          <Text style={styles.detailValue}>{item.requestDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Documents:</Text>
          <Text style={styles.detailValue}>{item.documents.join(', ')}</Text>
        </View>
        {item.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Notes:</Text>
            <Text style={styles.notesText}>{item.notes}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={styles.rejectButton}
          onPress={() => handleRejectRequest(item)}
        >
          <MaterialIcons name="cancel" size={16} color="white" style={styles.actionIcon} />
          <Text style={styles.actionButtonText}>Reject</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.approveButton}
          onPress={() => handleApproveRequest(item)}
        >
          <MaterialIcons name="check-circle" size={16} color="white" style={styles.actionIcon} />
          <Text style={styles.actionButtonText}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderApprovedRequest = ({ item }) => (
    <View style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View style={styles.userInfoContainer}>
          <View style={[styles.avatarContainer, styles.approvedAvatar]}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userDetails}>{item.phone}</Text>
            <Text style={styles.userDetails}>{item.email}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, styles.approvedBadge]}>
          <Text style={[styles.statusText, styles.approvedStatusText]}>Approved</Text>
        </View>
      </View>
      
      <View style={styles.requestDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>PG:</Text>
          <Text style={styles.detailValue}>{item.pgName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Room/Bed:</Text>
          <Text style={styles.detailValue}>Room {item.room}, Bed {item.bed}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Request Date:</Text>
          <Text style={styles.detailValue}>{item.requestDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Approval Date:</Text>
          <Text style={styles.detailValue}>{item.approvalDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Move-in Date:</Text>
          <Text style={styles.detailValue}>{item.moveInDate}</Text>
        </View>
      </View>
      
      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={styles.viewDetailsButton}
          onPress={() => navigation.navigate('AddTenant', { tenant: item })}
        >
          <Ionicons name="eye-outline" size={16} color="white" style={styles.actionIcon} />
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRejectedRequest = ({ item }) => (
    <View style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View style={styles.userInfoContainer}>
          <View style={[styles.avatarContainer, styles.rejectedAvatar]}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userDetails}>{item.phone}</Text>
            <Text style={styles.userDetails}>{item.email}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, styles.rejectedBadge]}>
          <Text style={[styles.statusText, styles.rejectedStatusText]}>Rejected</Text>
        </View>
      </View>
      
      <View style={styles.requestDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>PG:</Text>
          <Text style={styles.detailValue}>{item.pgName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Room/Bed:</Text>
          <Text style={styles.detailValue}>Room {item.room}, Bed {item.bed}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Request Date:</Text>
          <Text style={styles.detailValue}>{item.requestDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Rejection Date:</Text>
          <Text style={styles.detailValue}>{item.rejectionDate}</Text>
        </View>
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonLabel}>Reason for Rejection:</Text>
          <Text style={styles.reasonText}>{item.reason}</Text>
        </View>
      </View>
      
      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={styles.reconsiderButton}
          onPress={() => {
            Alert.alert(
              "Reconsider Application",
              `Do you want to reconsider ${item.name}'s application?`,
              [
                { text: "Cancel", style: "cancel" },
                { 
                  text: "Yes", 
                  onPress: () => {
                    // Move from rejected to pending
                    const updatedRejected = requestsData.rejected.filter(req => req.id !== item.id);
                    const pendingRequest = {
                      ...item,
                      id: 'p' + Date.now(), // Generate new ID
                      requestDate: new Date().toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      }),
                    };
                    delete pendingRequest.rejectionDate;
                    delete pendingRequest.reason;
                    
                    setRequestsData({
                      ...requestsData,
                      rejected: updatedRejected,
                      pending: [...requestsData.pending, pendingRequest]
                    });
                    
                    Alert.alert("Success", "Application moved to pending requests");
                  } 
                }
              ]
            );
          }}
        >
          <MaterialIcons name="replay" size={16} color="white" style={styles.actionIcon} />
          <Text style={styles.actionButtonText}>Reconsider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1976D2" barStyle="light-content" />
      
      {renderHeader()}
      {renderTabs()}
      {renderSearchBar()}
      
      <FlatList
        data={filteredRequests()}
        keyExtractor={(item) => item.id}
        renderItem={
          activeTab === 'pending' ? renderPendingRequest :
          activeTab === 'approved' ? renderApprovedRequest :
          renderRejectedRequest
        }
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="inbox" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No {activeTab} requests found</Text>
          </View>
        }
      />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1976D2',
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 16,
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#1976D2',
    backgroundColor: '#f0f7ff',
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#1976D2',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    padding: 12,
    paddingTop: 4,
  },
  requestCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  approvedAvatar: {
    backgroundColor: '#43A047',
  },
  rejectedAvatar: {
    backgroundColor: '#E53935',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  userDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 1,
  },
  statusBadge: {
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FBC02D',
  },
  approvedBadge: {
    backgroundColor: '#E8F5E9',
    borderColor: '#43A047',
  },
  rejectedBadge: {
    backgroundColor: '#FFEBEE',
    borderColor: '#E53935',
  },
  statusText: {
    color: '#F57F17',
    fontWeight: 'bold',
  },
  approvedStatusText: {
    color: '#2E7D32',
  },
  rejectedStatusText: {
    color: '#C62828',
  },
  requestDetails: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    width: 100,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  notesContainer: {
    marginTop: 6,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#333',
  },
  reasonContainer: {
    marginTop: 6,
    padding: 8,
    backgroundColor: '#ffebee',
    borderRadius: 4,
  },
  reasonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 14,
    color: '#333',
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 12,
  },
  approveButton: {
    backgroundColor: '#43A047',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  rejectButton: {
    backgroundColor: '#E53935',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  viewDetailsButton: {
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  reconsiderButton: {
    backgroundColor: '#FF9800',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  actionIcon: {
    marginRight: 6,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
});

export default TenantRequests; 