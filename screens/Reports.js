import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  Share,
  ActivityIndicator,
  Image,
  Alert,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
// Import react-native-chart-kit
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 40;

const Reports = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [earningsViewMode, setEarningsViewMode] = useState('monthly'); // 'monthly' or 'yearly'

  const categories = [
    { 
      id: 'analytics', 
      title: 'Analytics', 
      icon: <MaterialCommunityIcons name="chart-bar" size={28} color="#5E35B1" />,
      count: 3,
      color: "#EDE7F6"
    },
    { 
      id: 'pending', 
      title: 'Pending', 
      icon: <MaterialCommunityIcons name="clock-time-four-outline" size={28} color="#1E88E5" />,
      count: 3,
      color: "#E3F2FD"
    },
    { 
      id: 'due', 
      title: 'Due', 
      icon: <MaterialCommunityIcons name="calendar-alert" size={28} color="#E53935" />,
      count: 2,
      color: "#FFEBEE"
    },
    { 
      id: 'records', 
      title: 'Records', 
      icon: <MaterialCommunityIcons name="chart-box-outline" size={28} color="#43A047" />,
      count: 12,
      color: "#E8F5E9"
    },
    { 
      id: 'invoices', 
      title: 'Invoices', 
      icon: <FontAwesome name="file-text-o" size={28} color="#7B1FA2" />,
      count: 15,
      color: "#F3E5F5"
    },
    { 
      id: 'history', 
      title: 'Transactions', 
      icon: <MaterialCommunityIcons name="swap-horizontal" size={28} color="#FB8C00" />,
      count: 24,
      color: "#FFF3E0"
    }
  ];

  // Analytics data
  const monthlyEarningsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [85000, 92000, 118000, 105000, 110000, 125000],
        color: (opacity = 1) => `rgba(94, 53, 177, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Monthly Earnings (₹)"]
  };

  const yearlyEarningsData = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        data: [850000, 920000, 1100000, 1250000, 1380000],
        color: (opacity = 1) => `rgba(94, 53, 177, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Yearly Earnings (₹)"]
  };

  const occupancyRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [65, 70, 80, 75, 85, 90],
        color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Occupancy Rate (%)"]
  };

  const topRatedPGsData = {
    labels: ["PG1", "PG2", "PG3", "PG4", "PG5"],
    datasets: [
      {
        data: [4.8, 4.6, 4.5, 4.3, 4.2],
        color: (opacity = 1) => `rgba(67, 160, 71, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Rating (out of 5)"]
  };

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
    }
  };

  // Pie chart data for occupancy
  const occupancyPieData = [
    {
      name: "Occupied",
      population: 85,
      color: "#1E88E5",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Vacant",
      population: 15,
      color: "#E3F2FD",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    }
  ];

  const reportData = {
    pending: [
      { id: 1, roomNo: '101', tenant: 'John Doe', amount: '₹5,000', dueDate: '15 Apr 2023', photo: null },
      { id: 2, roomNo: '203', tenant: 'Alice Smith', amount: '₹7,500', dueDate: '18 Apr 2023', photo: null },
      { id: 3, roomNo: '305', tenant: 'Bob Johnson', amount: '₹6,200', dueDate: '20 Apr 2023', photo: null }
    ],
    due: [
      { id: 1, roomNo: '102', tenant: 'Mike Ross', amount: '₹8,000', dueDate: '10 Apr 2023', overdue: '5 days', photo: null },
      { id: 2, roomNo: '204', tenant: 'Rachel Green', amount: '₹7,000', dueDate: '05 Apr 2023', overdue: '10 days', photo: null }
    ],
    records: [
      { id: 1, month: 'March 2023', totalCollected: '₹1,25,000', pending: '₹15,000' },
      { id: 2, month: 'February 2023', totalCollected: '₹1,30,000', pending: '₹10,000' },
      { id: 3, month: 'January 2023', totalCollected: '₹1,20,000', pending: '₹18,000' }
    ],
    invoices: [
      { id: 1, invoiceNo: 'INV-001', tenant: 'John Doe', amount: '₹5,000', date: '01 Mar 2023', status: 'Paid' },
      { id: 2, invoiceNo: 'INV-002', tenant: 'Alice Smith', amount: '₹7,500', date: '02 Mar 2023', status: 'Paid' },
      { id: 3, invoiceNo: 'INV-003', tenant: 'Bob Johnson', amount: '₹6,200', date: '05 Mar 2023', status: 'Pending' }
    ],
    history: [
      { id: 1, transactionId: 'TXN-001', tenant: 'John Doe', amount: '₹5,000', date: '15 Mar 2023', type: 'Credit' },
      { id: 2, transactionId: 'TXN-002', tenant: 'Alice Smith', amount: '₹7,500', date: '16 Mar 2023', type: 'Credit' },
      { id: 3, transactionId: 'TXN-003', tenant: 'PG Maintenance', amount: '₹10,000', date: '20 Mar 2023', type: 'Debit' }
    ]
  };

  const onShare = async (category) => {
    try {
      setIsLoading(true);
      // Simulating PDF generation delay
      setTimeout(() => {
        setIsLoading(false);
        Share.share({
          message: `PG Revenue ${category} Report - Generated on ${new Date().toLocaleDateString()}`,
          title: `${category} Report`
        });
      }, 1500);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const downloadPdf = async (category) => {
    try {
      setIsPdfLoading(true);
      
      // Show generating message
      Alert.alert(
        "Generating PDF",
        "Your report is being generated...",
        [],
        { cancelable: false }
      );
      
      // Simulate PDF generation (in a real app, you would generate an actual PDF here)
      setTimeout(async () => {
        // Path for the dummy PDF file
        const fileUri = FileSystem.documentDirectory + `${category}_report.pdf`;
        
        // In a real app, you would generate the PDF and save it to fileUri
        // For this example, we'll just simulate success
        
        setIsPdfLoading(false);
        
        Alert.alert(
          "PDF Generated",
          `Your ${category} report has been downloaded successfully.`,
          [
            { 
              text: "View", 
              onPress: () => {
                // In a real app, you would open the PDF here
                Alert.alert("Opening PDF", `Opening ${category} report...`);
              } 
            },
            { text: "Share", onPress: () => sharePdf(fileUri, category) },
            { text: "Close", style: "cancel" }
          ]
        );
      }, 2000);
    } catch (error) {
      console.log('PDF generation error:', error);
      setIsPdfLoading(false);
      Alert.alert("Error", "Failed to generate PDF. Please try again.");
    }
  };

  const sharePdf = async (fileUri, category) => {
    try {
      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (isAvailable) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert(
          "Sharing not available",
          "Sharing is not available on this device"
        );
      }
    } catch (error) {
      console.log('Sharing error:', error);
      Alert.alert("Error", "Failed to share PDF. Please try again.");
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Financial Reports</Text>
        <TouchableOpacity 
          style={styles.downloadButton} 
          onPress={() => onShare(selectedCategory)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="share-social-outline" size={22} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>₹2,85,000</Text>
          <Text style={styles.statLabel}>Total Revenue</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>₹23,500</Text>
          <Text style={styles.statLabel}>Pending Amount</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>43</Text>
          <Text style={styles.statLabel}>Transactions</Text>
        </View>
      </View>
    </View>
  );

  const renderCategoryCards = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryCardsContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryCard,
            { backgroundColor: category.color },
            selectedCategory === category.id ? styles.selectedCategoryCard : null
          ]}
          onPress={() => setSelectedCategory(category.id)}
        >
          <View style={styles.categoryIcon}>
            {category.icon}
          </View>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categoryCount}>{category.count} items</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderPendingReports = () => (
    <View style={styles.reportsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Pending Payments</Text>
        <TouchableOpacity onPress={() => downloadPdf('Pending')} disabled={isPdfLoading}>
          <Text style={styles.sectionAction}>
            {isPdfLoading ? 'Generating...' : 'Download PDF'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {reportData.pending.map((item) => (
        <TouchableOpacity key={item.id} style={styles.cardItem}>
          <View style={styles.cardLeft}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{item.tenant.charAt(0)}</Text>
            </View>
          </View>
          <View style={styles.cardMiddle}>
            <Text style={styles.cardTitle}>{item.tenant}</Text>
            <Text style={styles.cardSubtitle}>Room {item.roomNo} • Due: {item.dueDate}</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.cardAmount}>{item.amount}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Pending</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderDueReports = () => (
    <View style={styles.reportsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Overdue Payments</Text>
        <TouchableOpacity onPress={() => downloadPdf('Due')} disabled={isPdfLoading}>
          <Text style={styles.sectionAction}>
            {isPdfLoading ? 'Generating...' : 'Download PDF'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {reportData.due.map((item) => (
        <TouchableOpacity key={item.id} style={styles.cardItem}>
          <View style={styles.cardLeft}>
            <View style={[styles.avatarCircle, { backgroundColor: '#FFCDD2' }]}>
              <Text style={[styles.avatarText, { color: '#D32F2F' }]}>{item.tenant.charAt(0)}</Text>
            </View>
          </View>
          <View style={styles.cardMiddle}>
            <Text style={styles.cardTitle}>{item.tenant}</Text>
            <Text style={styles.cardSubtitle}>Room {item.roomNo} • Overdue: {item.overdue}</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.cardAmount}>{item.amount}</Text>
            <View style={[styles.statusBadge, { backgroundColor: '#FFEBEE' }]}>
              <Text style={[styles.statusText, { color: '#C62828' }]}>Overdue</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRecordsReports = () => (
    <View style={styles.reportsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Monthly Records</Text>
        <TouchableOpacity onPress={() => downloadPdf('Records')} disabled={isPdfLoading}>
          <Text style={styles.sectionAction}>
            {isPdfLoading ? 'Generating...' : 'Download PDF'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {reportData.records.map((item) => (
        <TouchableOpacity key={item.id} style={styles.cardItem}>
          <View style={styles.cardLeft}>
            <View style={[styles.avatarCircle, { backgroundColor: '#C8E6C9' }]}>
              <MaterialCommunityIcons name="calendar-month" size={24} color="#2E7D32" />
            </View>
          </View>
          <View style={styles.cardMiddle}>
            <Text style={styles.cardTitle}>{item.month}</Text>
            <Text style={styles.cardSubtitle}>Collected: {item.totalCollected}</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={[styles.cardAmount, { color: '#D32F2F' }]}>{item.pending}</Text>
            <Text style={{ fontSize: 12, color: '#757575' }}>Pending</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderInvoicesReports = () => (
    <View style={styles.reportsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Invoices</Text>
        <TouchableOpacity onPress={() => downloadPdf('Invoices')} disabled={isPdfLoading}>
          <Text style={styles.sectionAction}>
            {isPdfLoading ? 'Generating...' : 'Download PDF'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {reportData.invoices.map((item) => (
        <TouchableOpacity key={item.id} style={styles.cardItem}>
          <View style={styles.cardLeft}>
            <View style={[styles.avatarCircle, { backgroundColor: '#E1BEE7' }]}>
              <FontAwesome name="file-text-o" size={20} color="#6A1B9A" />
            </View>
          </View>
          <View style={styles.cardMiddle}>
            <Text style={styles.cardTitle}>{item.invoiceNo}</Text>
            <Text style={styles.cardSubtitle}>{item.tenant} • {item.date}</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.cardAmount}>{item.amount}</Text>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: item.status === 'Paid' ? '#E8F5E9' : '#FFEBEE' }
            ]}>
              <Text style={[
                styles.statusText, 
                { color: item.status === 'Paid' ? '#2E7D32' : '#C62828' }
              ]}>
                {item.status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderHistoryReports = () => (
    <View style={styles.reportsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
        <TouchableOpacity onPress={() => downloadPdf('Transaction History')} disabled={isPdfLoading}>
          <Text style={styles.sectionAction}>
            {isPdfLoading ? 'Generating...' : 'Download PDF'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {reportData.history.map((item) => (
        <TouchableOpacity key={item.id} style={styles.cardItem}>
          <View style={styles.cardLeft}>
            <View style={[
              styles.avatarCircle, 
              { backgroundColor: item.type === 'Credit' ? '#C8E6C9' : '#FFCDD2' }
            ]}>
              <Ionicons 
                name={item.type === 'Credit' ? "arrow-down" : "arrow-up"} 
                size={24} 
                color={item.type === 'Credit' ? "#2E7D32" : "#C62828"} 
              />
            </View>
          </View>
          <View style={styles.cardMiddle}>
            <Text style={styles.cardTitle}>{item.transactionId}</Text>
            <Text style={styles.cardSubtitle}>{item.tenant} • {item.date}</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={[
              styles.cardAmount,
              { color: item.type === 'Credit' ? '#2E7D32' : '#C62828' }
            ]}>
              {item.type === 'Credit' ? '+' : '-'}{item.amount}
            </Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: item.type === 'Credit' ? '#E8F5E9' : '#FFEBEE' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: item.type === 'Credit' ? '#2E7D32' : '#C62828' }
              ]}>
                {item.type}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAnalyticsReports = () => (
    <View style={styles.reportsSection}>
      {/* Earnings Overview */}
      <View style={styles.analyticsCard}>
        <View style={styles.analyticsHeader}>
          <Text style={styles.analyticsTitle}>Earnings Overview</Text>
          <View style={styles.segmentedControl}>
            <TouchableOpacity 
              style={[
                styles.segmentButton, 
                earningsViewMode === 'monthly' ? styles.segmentButtonActive : null
              ]}
              onPress={() => setEarningsViewMode('monthly')}
            >
              <Text style={[
                styles.segmentButtonText,
                earningsViewMode === 'monthly' ? styles.segmentButtonTextActive : null
              ]}>Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.segmentButton, 
                earningsViewMode === 'yearly' ? styles.segmentButtonActive : null
              ]}
              onPress={() => setEarningsViewMode('yearly')}
            >
              <Text style={[
                styles.segmentButtonText,
                earningsViewMode === 'yearly' ? styles.segmentButtonTextActive : null
              ]}>Yearly</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.chartContainer}>
          <LineChart
            data={earningsViewMode === 'monthly' ? monthlyEarningsData : yearlyEarningsData}
            width={screenWidth}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(94, 53, 177, ${opacity})`
            }}
            bezier
            style={styles.chart}
          />
        </View>
        
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹1.25L</Text>
            <Text style={styles.statLabel}>Latest Month</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹6.35L</Text>
            <Text style={styles.statLabel}>Last 6 Months</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>+12%</Text>
            <Text style={styles.statLabel}>Growth Rate</Text>
          </View>
        </View>
      </View>

      {/* Occupancy Rate */}
      <View style={styles.analyticsCard}>
        <View style={styles.analyticsHeader}>
          <Text style={styles.analyticsTitle}>Occupancy Rate</Text>
          <TouchableOpacity onPress={() => downloadPdf('Occupancy')} disabled={isPdfLoading}>
            <Text style={styles.sectionAction}>
              {isPdfLoading ? 'Generating...' : 'Download PDF'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.twoColumnCharts}>
          <View style={styles.pieChartContainer}>
            <PieChart
              data={occupancyPieData}
              width={screenWidth * 0.45}
              height={180}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"0"}
              center={[0, 0]}
              absolute
            />
          </View>
          
          <View style={styles.occupancyStats}>
            <View style={styles.occupancyStatItem}>
              <View style={styles.occupancyDot} />
              <View>
                <Text style={styles.occupancyValue}>85%</Text>
                <Text style={styles.occupancyLabel}>Occupied</Text>
              </View>
            </View>
            <View style={styles.occupancyStatItem}>
              <View style={[styles.occupancyDot, { backgroundColor: '#E3F2FD' }]} />
              <View>
                <Text style={styles.occupancyValue}>15%</Text>
                <Text style={styles.occupancyLabel}>Vacant</Text>
              </View>
            </View>
            <Text style={styles.occupancyTrend}>↑ 5% from last month</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <LineChart
            data={occupancyRateData}
            width={screenWidth}
            height={170}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </View>

      {/* Top-Rated PGs */}
      <View style={styles.analyticsCard}>
        <View style={styles.analyticsHeader}>
          <Text style={styles.analyticsTitle}>Top-Rated PGs</Text>
          <TouchableOpacity onPress={() => downloadPdf('Top-Rated')} disabled={isPdfLoading}>
            <Text style={styles.sectionAction}>
              {isPdfLoading ? 'Generating...' : 'Download PDF'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.chartContainer}>
          <BarChart
            data={topRatedPGsData}
            width={screenWidth}
            height={220}
            yAxisSuffix=""
            yAxisLabel=""
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(67, 160, 71, ${opacity})`,
              barPercentage: 0.6,
            }}
            style={styles.chart}
          />
        </View>
        
        <View style={styles.ratedPGsList}>
          {[
            { name: "Sunshine PG", location: "Koramangala", rating: 4.8 },
            { name: "Green Valley PG", location: "HSR Layout", rating: 4.6 },
            { name: "City Comfort PG", location: "Indiranagar", rating: 4.5 }
          ].map((pg, index) => (
            <View key={index} style={styles.pgItem}>
              <View style={styles.pgRank}>
                <Text style={styles.pgRankText}>{index + 1}</Text>
              </View>
              <View style={styles.pgInfo}>
                <Text style={styles.pgName}>{pg.name}</Text>
                <Text style={styles.pgLocation}>{pg.location}</Text>
              </View>
              <View style={styles.pgRating}>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>{pg.rating}</Text>
                  <Ionicons name="star" size={12} color="#FFD700" />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderReportContent = () => {
    switch(selectedCategory) {
      case 'analytics':
        return renderAnalyticsReports();
      case 'pending':
        return renderPendingReports();
      case 'due':
        return renderDueReports();
      case 'records':
        return renderRecordsReports();
      case 'invoices':
        return renderInvoicesReports();
      case 'history':
        return renderHistoryReports();
      default:
        return renderPendingReports();
    }
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <View style={styles.content}>
        <Text style={styles.contentHeading}>Report Categories</Text>
        {renderCategoryCards()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderReportContent()}
        </ScrollView>
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
    backgroundColor: '#1976D2',
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  contentHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoryCardsContainer: {
    paddingBottom: 5,
    marginBottom: 20,
  },
  categoryCard: {
    width: 110,
    height: 120,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  selectedCategoryCard: {
    borderWidth: 2,
    borderColor: '#1976D2',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
  reportsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionAction: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
  },
  cardItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  cardLeft: {
    marginRight: 12,
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  cardMiddle: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#757575',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#1976D2',
  },
  // Analytics styles
  analyticsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  analyticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 2,
  },
  segmentButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
  },
  segmentButtonActive: {
    backgroundColor: '#5E35B1',
  },
  segmentButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  segmentButtonTextActive: {
    color: 'white',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statItem: {
    alignItems: 'center',
  },
  twoColumnCharts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pieChartContainer: {
    width: '50%',
    alignItems: 'center',
  },
  occupancyStats: {
    width: '50%',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  occupancyStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  occupancyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1E88E5',
    marginRight: 8,
  },
  occupancyValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  occupancyLabel: {
    fontSize: 12,
    color: '#666',
  },
  occupancyTrend: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 8,
  },
  ratedPGsList: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  pgItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pgRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pgRankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#43A047',
  },
  pgInfo: {
    flex: 1,
  },
  pgName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  pgLocation: {
    fontSize: 12,
    color: '#666',
  },
  pgRating: {
    alignItems: 'flex-end',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFA000',
    marginRight: 3,
  },
});

export default Reports; 