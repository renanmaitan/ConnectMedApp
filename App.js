import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Logo from './src/components/Logo/'
import Form from './src/components/Form/'
import Copyright from './src/components/Copyright';

export default function App() {
  return (
    <View style={styles.container}>
      <Logo/>
      <Form/>
      <Copyright/>
      <StatusBar backgroundColor='#086972'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFEDEB',
    alignItems: 'center',
  },
});
