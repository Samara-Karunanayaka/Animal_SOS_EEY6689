import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password, role = 'citizen') => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      role,
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=FF6B6B&color=fff`,
      joinedDate: new Date().toISOString(),
    };
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setLoading(false);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name, email, password, role = 'citizen') => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      id: Date.now(),
      name,
      email,
      role,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=FF6B6B&color=fff`,
      joinedDate: new Date().toISOString(),
    };
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setLoading(false);
    return userData;
  };

  const updateUser = async (updatedData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setLoading(false);
    return updatedUser;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};