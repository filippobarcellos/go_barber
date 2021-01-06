import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/useAuth';
import Routes from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e32" />
      <AuthProvider>
        <View style={{ flex: 1, backgroundColor: '#312e32' }}>
          <Routes />
        </View>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
