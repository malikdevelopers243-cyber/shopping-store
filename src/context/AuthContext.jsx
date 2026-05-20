import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // 🔧 Helper function: Saare users ka data get karo
  const getAllUsers = () => {
    const usersJSON = localStorage.getItem('allUsers');
    return usersJSON ? JSON.parse(usersJSON) : [];
  };

  // 🔧 Helper function: User ko find karo email se
  const findUserByEmail = (email) => {
    const allUsers = getAllUsers();
    return allUsers.find(u => u.email === email);
  };

  // 🔧 Helper function: User ko save/update karo
  const saveUser = (userData) => {
    const allUsers = getAllUsers();
    const existingIndex = allUsers.findIndex(u => u.email === userData.email);
    
    if (existingIndex >= 0) {
      allUsers[existingIndex] = userData;
    } else {
      allUsers.push(userData);
    }
    
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
  };

  const signup = async (email, password, name) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check karo kya ye email pehle se exist karta hai
      const existingUser = findUserByEmail(email);
      if (existingUser) {
        return { success: false, message: 'Email already registered' };
      }

      const newUser = {
        id: Date.now(),
        email,
        name,
        password, // Demo ke liye - production mein hash karo!
        createdAt: new Date().toISOString()
      };
      
      // Naya user save karo
      saveUser(newUser);
      
      // Current user ko set karo
      setUser(newUser);
      
      return { success: true, message: 'Account created successfully!' };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Email se user find karo
      const userData = findUserByEmail(email);
      
      if (!userData) {
        return { success: false, message: 'User not found. Please signup first.' };
      }
      
      // Password check karo
      if (userData.password !== password) {
        return { success: false, message: 'Invalid email or password' };
      }
      
      // User ko current session mein set karo
      setUser(userData);
      
      return { success: true, message: 'Logged in successfully!' };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // 🆕 Forget Password - Step 1
  const forgetPassword = async (email) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Email se user find karo
      const userData = findUserByEmail(email);
      
      if (!userData) {
        return { success: false, message: 'Email not registered' };
      }
      
      // Reset code generate karo
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      // localStorage mein save karo
      localStorage.setItem('resetCode', code);
      localStorage.setItem('resetEmail', email);
      
      // Demo ke liye console mein show karo
      console.log('🔐 Reset Code:', code);
      
      setResetEmail(email);
      return { 
        success: true, 
        message: `Reset code sent to ${email}. Check console for code (Demo).`,
        email: email 
      };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // 🆕 Verify Reset Code
  const verifyResetCode = async (code) => {
    const storedCode = localStorage.getItem('resetCode');
    
    if (code === storedCode) {
      return { success: true, message: 'Code verified successfully!' };
    } else {
      return { success: false, message: 'Invalid reset code' };
    }
  };

  // 🆕 Reset Password
  const resetPassword = async (newPassword, confirmPassword) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (newPassword !== confirmPassword) {
        return { success: false, message: 'Passwords do not match' };
      }

      if (newPassword.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters' };
      }

      const email = localStorage.getItem('resetEmail');
      
      // User find karo
      const userData = findUserByEmail(email);
      if (!userData) {
        return { success: false, message: 'User not found' };
      }
      
      // Password update karo
      userData.password = newPassword;
      saveUser(userData);
      
      // Reset codes clear karo
      localStorage.removeItem('resetCode');
      localStorage.removeItem('resetEmail');
      
      setResetEmail('');
      
      return { success: true, message: 'Password reset successfully! Please login with new password.' };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // localStorage clear na karo - sirf current session clear karo
  };

  const checkUserOnMount = () => {
    // Check karo kya user pehle se logged in tha
    // (isi session mein)
    // Logout ke baad logout state save ho jaati hai
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      signup, 
      login, 
      logout, 
      checkUserOnMount,
      forgetPassword,
      verifyResetCode,
      resetPassword,
      resetEmail,
      setResetEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};