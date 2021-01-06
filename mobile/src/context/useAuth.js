import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const token = await AsyncStorage.getItem('@gobarber:token');
      const user = await AsyncStorage.getItem('@gobarber:user');

      if (token && user) {
        setData({ token, user: JSON.parse(user) });
      }
      setIsLoading(false);
    }

    loadStorageData();
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.setItem('@gobarber:token', token);
    await AsyncStorage.setItem('@gobarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('@gobarber:token');
    await AsyncStorage.removeItem('@gobarber:user');

    setData({});
  };

  const updateUser = async (user) => {
    await AsyncStorage.setItem('@gobarber:user', JSON.stringify(user));

    setData({
      token: data.token,
      user,
    });
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user: data.user, updateUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
