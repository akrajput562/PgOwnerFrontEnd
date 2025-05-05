import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pgok-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.appName}>PgOk</Text>
        <Text style={styles.slogan}>Easy Tenant Management</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
    height: '100%',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  slogan: {
    fontSize: 14,
    color: '#fff',
  },
});

export default CustomHeader;
