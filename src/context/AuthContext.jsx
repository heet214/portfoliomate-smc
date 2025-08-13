import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser as apiLoginUser, logoutUser as apiLogoutUser, verifySession as apiVerifySession } from '../apis';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for an active session on initial app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const userData = await apiVerifySession();
        setUser(userData);
      } catch (error) {
        // No valid session found, which is normal
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (credentials) => {
    try {
      const userData = await apiLoginUser(credentials);
      setUser(userData);
      return userData;
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
