import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import RootStack from './navigators/RootStack';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <RootStack />
    </SafeAreaView>
  );
}

  