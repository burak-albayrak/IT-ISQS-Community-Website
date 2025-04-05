import React, { createContext, useState, useEffect, useContext } from 'react';
import { isAuthenticated, getCurrentUser, logout } from '../services/authService';

// Auth context oluşturma
const AuthContext = createContext(null);

// Context provider bileşeni
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Uygulama başladığında kullanıcı durumunu kontrol et
  useEffect(() => {
    const initAuth = () => {
      if (isAuthenticated()) {
        setUser(getCurrentUser());
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Kullanıcı girişi
  const login = (userData) => {
    setUser(userData);
  };

  // Kullanıcı çıkışı
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  // Kullanıcı kaydı
  const register = () => {
    // Sadece başarılı kaydı işaretlemek için, giriş henüz yapılmaz
    // Doğrulama gerçekleştiğinde login fonksiyonu çağrılmalı
  };

  // Auth durumunu güncelleme
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Context değerleri
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout: handleLogout,
    register,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Context hook'u
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 