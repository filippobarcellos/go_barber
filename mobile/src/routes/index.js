import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Register from '../pages/Register';

const Auth = createStackNavigator();

const Routes = () => {
  return (
    <Auth.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e32' },
      }}
    >
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="Register" component={Register} />
    </Auth.Navigator>
  );
};

export default Routes;
