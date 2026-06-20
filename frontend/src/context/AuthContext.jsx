import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const API_URL = "https://medical-backend.vercel.app";


  // Check user already logged in
  useEffect(() => {

    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }

    setLoading(false);

  }, []);



  // Register API
  const register = async (name, email, password) => {

    const { data } = await axios.post(
      `${API_URL}/api/auth/register`,
      {
        name,
        email,
        password
      }
    );


    setUser(data);


    localStorage.setItem(
      "userInfo",
      JSON.stringify(data)
    );


    return data;

  };




  // Login API
  const login = async (email, password) => {


    const { data } = await axios.post(
      `${API_URL}/api/auth/login`,
      {
        email,
        password
      }
    );


    setUser(data);


    localStorage.setItem(
      "userInfo",
      JSON.stringify(data)
    );


    return data;

  };





  // Logout
  const logout = () => {

    setUser(null);

    localStorage.removeItem("userInfo");

  };





  return (

    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        loading
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};