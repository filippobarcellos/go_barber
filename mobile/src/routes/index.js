import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthRoutes from './authRoutes';
import AppRoutes from './appRoutes';

import { useAuth } from '../context/useAuth';

const Routes = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
