import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from "antd";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        navigate("/");
        return;
      }

      navigate("/login");
    });

    return () => {
      unsubscribed();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      <Spin spinning={isLoading}>{children}</Spin>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
