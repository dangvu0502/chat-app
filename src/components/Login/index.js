import React from "react";
import { Row, Col, Button, Typography } from "antd";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";

const { Title } = Typography;

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const Login = () => {

  const handleLogin = async (provider) => {
    const data = await signInWithPopup(auth, provider);
    const additionalUserInfo = getAdditionalUserInfo(data);
    
    if (additionalUserInfo.isNewUser) {
      const { user } = data;
      // console.log({ user });
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };

  return (
    <Row justify="center" style={{ height: 800 }}>
      <Col span={8}>
        <Title style={{ textAlign: "center" }}>Chat App</Title>
        <Button
          name="loginWithGoogle"
          style={{ width: "100%", marginBottom: 5 }}
          onClick={() => handleLogin(googleProvider)}
        >
          Login with Google
        </Button>
        <Button
          name="loginWithFacebook"
          style={{ width: "100%" }}
          onClick={() => handleLogin(facebookProvider)}
        >
          Login with Facebook
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
