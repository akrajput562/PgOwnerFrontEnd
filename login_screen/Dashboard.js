// app/dashboard.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Dimensions } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.statsContainer}>
          <StatCard title="Total PGs Registered" value="25" />
          <StatCard title="Total Floors & Rooms" value="120" />
          <StatCard title="Total Tenants" value="95" />
          <StatCard title="Occupancy Rate" value="79%" />
          <StatCard title="Monthly Revenue" value="₹2,50,000" />
        </View>
      </View>

      {/* Search & Filter */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search & Filter</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Tenant, PG, Floor or Room"
            placeholderTextColor="#999"
          />
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Status:</Text>
            <View style={styles.filterButtons}>
              <Text style={[styles.filterButton, styles.activeFilter]}>All</Text>
              <Text style={styles.filterButton}>Occupied</Text>
              <Text style={styles.filterButton}>Vacant</Text>
              <Text style={styles.filterButton}>Under Notice</Text>
            </View>
          </View>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Date Range:</Text>
            <View style={styles.filterButtons}>
              <Text style={styles.filterButton}>Last 7 Days</Text>
              <Text style={styles.filterButton}>Last 30 Days</Text>
              <Text style={styles.filterButton}>Custom</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tenant Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tenant Management</Text>
        <View style={styles.tenantContainer}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Sort by:</Text>
            <View style={styles.filterButtons}>
              <Text style={[styles.filterButton, styles.activeFilter]}>Name</Text>
              <Text style={styles.filterButton}>Room</Text>
              <Text style={styles.filterButton}>PG</Text>
            </View>
          </View>
          <View style={styles.tenantCategory}>
            <Text style={styles.tenantCategoryTitle}>Active Tenants</Text>
            <View style={styles.tenantList}>
              <TenantItem name="John Doe" pgName="PG Paradise" room="A101" />
              <TenantItem name="Jane Smith" pgName="PG Harmony" room="B202" />
            </View>
          </View>
          <View style={styles.tenantCategory}>
            <Text style={styles.tenantCategoryTitle}>Tenants Under Notice</Text>
            <View style={styles.tenantList}>
              <TenantItem name="Mike Johnson" pgName="PG Serenity" room="C303" noticeDays={15} />
            </View>
          </View>
          <View style={styles.tenantCategory}>
            <Text style={styles.tenantCategoryTitle}>Pending Requests</Text>
            <View style={styles.tenantList}>
              <TenantItem name="Sarah Lee" pgName="PG Bliss" room="D404" pending />
            </View>
          </View>
        </View>
      </View>

      {/* PG Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PG Management</Text>
        <View style={styles.pgContainer}>
          <View style={styles.pgControls}>
            <Text style={styles.pgCategoryTitle}>Manage PGs</Text>
            <View style={styles.buttonRow}>
              <Text style={styles.controlButton}>Add PG</Text>
              <Text style={styles.controlButton}>Edit PG</Text>
              <Text style={styles.controlButton}>Delete PG</Text>
            </View>
          </View>
          <View style={styles.pgControls}>
            <Text style={styles.pgCategoryTitle}>Manage Floors</Text>
            <View style={styles.buttonRow}>
              <Text style={styles.controlButton}>Add Floor</Text>
              <Text style={styles.controlButton}>Edit Floor</Text>
              <Text style={styles.controlButton}>Delete Floor</Text>
            </View>
          </View>
          <View style={styles.pgControls}>
            <Text style={styles.pgCategoryTitle}>Manage Rooms</Text>
            <View style={styles.buttonRow}>
              <Text style={styles.controlButton}>Add Room</Text>
              <Text style={styles.controlButton}>Edit Room</Text>
              <Text style={styles.controlButton}>Delete Room</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Maintenance Requests Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Maintenance Requests</Text>
        <View style={styles.maintenanceContainer}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Filter by:</Text>
            <View style={styles.filterButtons}>
              <Text style={[styles.filterButton, styles.activeFilter]}>All</Text>
              <Text style={styles.filterButton}>Pending</Text>
              <Text style={styles.filterButton}>In Progress</Text>
              <Text style={styles.filterButton}>Completed</Text>
            </View>
          </View>
          <View style={styles.maintenanceList}>
            <MaintenanceItem pgName="PG Paradise" floor="A" room="101" issue="Leakage in bathroom" status="Pending" />
            <MaintenanceItem pgName="PG Harmony" floor="B" room="202" issue="AC not working" status="In Progress" />
          </View>
        </View>
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.notificationContainer}>
          <NotificationItem type="alert" title="Maintenance Due" message="Room A101 requires maintenance" count={1} />
          <NotificationItem type="info" title="New Request" message="Sarah Lee has requested a room change" count={2} />
        </View>
      </View>

      {/* Revenue Reports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Reports</Text>
        <View style={styles.revenueContainer}>
          <View style={styles.revenueSummary}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Collection</Text>
              <Text style={styles.summaryValue}>₹2,50,000</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Due Amount</Text>
              <Text style={styles.summaryValue}>₹25,000</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Pending Payments</Text>
              <Text style={styles.summaryValue}>₹15,000</Text>
            </View>
          </View>
          <View style={styles.revenueFilters}>
            <Text style={styles.filterLabel}>Filter by:</Text>
            <View style={styles.filterButtons}>
              <Text style={[styles.filterButton, styles.activeFilter]}>This Month</Text>
              <Text style={styles.filterButton}>Last Month</Text>
              <Text style={styles.filterButton}>Custom</Text>
            </View>
          </View>
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    data: [20000, 45000, 28000, 80000, 99000, 43000],
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                    strokeWidth: 2
                  }
                ]
              }}
              width={Dimensions.get('window').width - 40}
              height={220}
              yAxisLabel="₹"
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726'
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>
          <View style={styles.transactionList}>
            <TransactionItem date="25 Mar" amount="₹5,000" status="Paid" />
            <TransactionItem date="24 Mar" amount="₹7,000" status="Pending" />
          </View>
        </View>
      </View>

      {/* Request Handling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Request Handling</Text>
        <View style={styles.requestContainer}>
          <View style={styles.requestCategory}>
            <Text style={styles.requestCategoryTitle}>Pending Approvals</Text>
            <View style={styles.requestList}>
              <RequestItem type="Room Change" tenant="John Doe" date="25 Mar" />
              <RequestItem type="PG Transfer" tenant="Jane Smith" date="24 Mar" />
            </View>
          </View>
          <View style={styles.requestCategory}>
            <Text style={styles.requestCategoryTitle}>Recent Requests</Text>
            <View style={styles.requestList}>
              <RequestItem type="Detach Request" tenant="Mike Johnson" date="23 Mar" status="Approved" />
              <RequestItem type="Maintenance" tenant="Sarah Lee" date="22 Mar" status="Rejected" />
            </View>
          </View>
        </View>
      </View>

      {/* Notifications & Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications & Alerts</Text>
        <View style={styles.notificationContainer}>
          <NotificationItem
            type="payment"
            title="Payment Reminder"
            message="3 tenants have pending payments"
            count={3}
          />
          <NotificationItem
            type="maintenance"
            title="Maintenance Request"
            message="New request from Room A101"
          />
          <NotificationItem
            type="lead"
            title="New Lead"
            message="Potential tenant inquiry for PG Harmony"
          />
        </View>
      </View>

      {/* Beds Availability */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beds Availability</Text>
        <View style={styles.bedsContainer}>
          <View style={styles.bedsSummary}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Beds</Text>
              <Text style={styles.summaryValue}>120</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Available Beds</Text>
              <Text style={styles.summaryValue}>25</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Occupancy Rate</Text>
              <Text style={styles.summaryValue}>79%</Text>
            </View>
          </View>
          <View style={styles.bedsBreakdown}>
            <Text style={styles.breakdownTitle}>Breakdown by PG</Text>
            <View style={styles.bedsList}>
              <BedsItem pgName="PG Paradise" totalBeds={50} availableBeds={10} />
              <BedsItem pgName="PG Harmony" totalBeds={40} availableBeds={8} />
              <BedsItem pgName="PG Serenity" totalBeds={30} availableBeds={7} />
            </View>
          </View>
        </View>
      </View>

      {/* Profiling & Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profiling & Analytics</Text>
        <View style={styles.analyticsContainer}>
          <View style={styles.analyticsRow}>
            <View style={styles.analyticsItem}>
              <Text style={styles.analyticsLabel}>Tenant Demographics</Text>
              <PieChart
                data={[
                  { name: 'Students', population: 60, color: '#FF6384' },
                  { name: 'Professionals', population: 30, color: '#36A2EB' },
                  { name: 'Others', population: 10, color: '#FFCE56' },
                ]}
                width={Dimensions.get('window').width - 40}
                height={200}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
            <View style={styles.analyticsItem}>
              <Text style={styles.analyticsLabel}>Revenue Trends</Text>
              <LineChart
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [
                    {
                      data: [20000, 45000, 28000, 80000, 99000, 43000],
                      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                      strokeWidth: 2,
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 40}
                height={200}
                yAxisLabel="₹"
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                bezier
              />
            </View>
          </View>
        </View>
      </View>

      {/* Add analytics components */}
    </ScrollView>
  );
};

const StatCard = ({ title, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const TenantItem = ({ name, pgName, room, noticeDays, pending }) => (
  <View style={styles.tenantItem}>
    <View style={styles.tenantInfo}>
      <Text style={styles.tenantName}>{name}</Text>
      <Text style={styles.tenantDetails}>{pgName} - Room {room}</Text>
    </View>
    {noticeDays && (
      <Text style={styles.noticeBadge}>Notice: {noticeDays} days</Text>
    )}
    {pending && (
      <Text style={styles.pendingBadge}>Pending Approval</Text>
    )}
  </View>
);

const TransactionItem = ({ date, amount, status }) => (
  <View style={styles.transactionItem}>
    <View style={styles.transactionInfo}>
      <Text style={styles.transactionDate}>{date}</Text>
      <Text style={styles.transactionAmount}>{amount}</Text>
    </View>
    <Text style={[
      styles.transactionStatus,
      status === 'Paid' ? styles.statusPaid : styles.statusPending
    ]}>{status}</Text>
  </View>
);

const RequestItem = ({ type, tenant, date, status }) => (
  <View style={styles.requestItem}>
    <View style={styles.requestInfo}>
      <Text style={styles.requestType}>{type}</Text>
      <Text style={styles.requestDetails}>{tenant} - {date}</Text>
    </View>
    {status && (
      <Text style={[
        styles.requestStatus,
        status === 'Approved' ? styles.statusApproved : styles.statusRejected
      ]}>{status}</Text>
    )}
    {!status && (
      <View style={styles.requestActions}>
        <Text style={styles.actionButton}>Approve</Text>
        <Text style={styles.actionButton}>Reject</Text>
      </View>
    )}
  </View>
);

const NotificationItem = ({ type, title, message, count }) => (
  <View style={styles.notificationItem}>
    <View style={[
      styles.notificationIcon,
      type === 'payment' && styles.paymentIcon,
      type === 'maintenance' && styles.maintenanceIcon,
      type === 'lead' && styles.leadIcon,
      type === 'alert' && styles.alertIcon,
      type === 'info' && styles.infoIcon
    ]}>
      <Text style={styles.iconText}>{type === 'payment' ? '₹' : type === 'maintenance' ? '⚒️' : type === 'lead' ? '📞' : type === 'alert' ? '⚠️' : type === 'info' ? 'ℹ️' : ''}</Text>
    </View>
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{title}</Text>
      <Text style={styles.notificationMessage}>{message}</Text>
    </View>
    {count && (
      <View style={styles.notificationCount}>
        <Text style={styles.countText}>{count}</Text>
      </View>
    )}
  </View>
);

const MaintenanceItem = ({ pgName, floor, room, issue, status }) => (
  <View style={styles.maintenanceItem}>
    <View style={styles.maintenanceInfo}>
      <Text style={styles.maintenancePG}>{pgName}</Text>
      <Text style={styles.maintenanceDetails}>{floor} - Room {room}</Text>
    </View>
    <Text style={styles.maintenanceIssue}>{issue}</Text>
    <Text style={[
      styles.maintenanceStatus,
      status === 'Pending' ? styles.statusPending : status === 'In Progress' ? styles.statusInProgress : styles.statusCompleted
    ]}>{status}</Text>
  </View>
);

const BedsItem = ({ pgName, totalBeds, availableBeds }) => (
  <View style={styles.bedsItem}>
    <Text style={styles.bedsPG}>{pgName}</Text>
    <View style={styles.bedsInfo}>
      <Text style={styles.bedsTotal}>Total Beds: {totalBeds}</Text>
      <Text style={styles.bedsAvailable}>Available Beds: {availableBeds}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    marginRight: 8,
    color: '#666',
  },
  filterButtons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    color: '#666',
  },
  activeFilter: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  tenantContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  tenantCategory: {
    marginBottom: 16,
  },
  tenantCategoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tenantList: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  tenantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tenantInfo: {
    flex: 1,
  },
  tenantName: {
    fontSize: 14,
    fontWeight: '500',
  },
  tenantDetails: {
    fontSize: 12,
    color: '#666',
  },
  noticeBadge: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  pendingBadge: {
    backgroundColor: '#d4edda',
    color: '#155724',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  pgContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  pgControls: {
    marginBottom: 16,
  },
  pgCategoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    color: '#007bff',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  revenueContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  revenueSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  revenueFilters: {
    marginBottom: 16,
  },
  transactionList: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDate: {
    marginRight: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  statusPaid: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusPending: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  requestContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  requestCategory: {
    marginBottom: 16,
  },
  requestCategoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  requestList: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  requestInfo: {
    flex: 1,
  },
  requestType: {
    fontSize: 14,
    fontWeight: '500',
  },
  requestDetails: {
    fontSize: 12,
    color: '#666',
  },
  requestStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  statusApproved: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusRejected: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  requestActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    backgroundColor: '#f8f9fa',
    color: '#007bff',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  notificationContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentIcon: {
    backgroundColor: '#d4edda',
  },
  maintenanceIcon: {
    backgroundColor: '#fff3cd',
  },
  leadIcon: {
    backgroundColor: '#d1ecf1',
  },
  alertIcon: {
    backgroundColor: '#ffc107',
  },
  infoIcon: {
    backgroundColor: '#17a2b8',
  },
  iconText: {
    fontSize: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  notificationMessage: {
    fontSize: 12,
    color: '#666',
  },
  notificationCount: {
    backgroundColor: '#dc3545',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginBottom: 16,
  },
  maintenanceContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  maintenanceList: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  maintenanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  maintenanceInfo: {
    flex: 1,
  },
  maintenancePG: {
    fontSize: 14,
    fontWeight: '500',
  },
  maintenanceDetails: {
    fontSize: 12,
    color: '#666',
  },
  maintenanceIssue: {
    fontSize: 14,
    fontWeight: '500',
  },
  maintenanceStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  statusInProgress: {
    backgroundColor: '#d1ecf1',
    color: '#155724',
  },
  statusCompleted: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  bedsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  bedsSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bedsBreakdown: {
    marginBottom: 16,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bedsList: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  bedsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bedsPG: {
    fontSize: 14,
    fontWeight: '500',
  },
  bedsInfo: {
    flex: 1,
  },
  bedsTotal: {
    fontSize: 12,
    color: '#666',
  },
  bedsAvailable: {
    fontSize: 12,
    color: '#666',
  },
  analyticsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analyticsItem: {
    flex: 1,
    marginRight: 16,
  },
  analyticsLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
});

export default Dashboard;
