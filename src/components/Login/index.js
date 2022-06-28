import React from "react";
import { Row, Col, Button, Typography } from "antd";
import {
  signInWithPopup,
  FacebookAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";

const { Title } = Typography;

const Login = () => {
  const handleLogin = async () => {
    const data = await signInWithPopup(auth, new FacebookAuthProvider());
    const additionalUserInfo = getAdditionalUserInfo(data);
    if (additionalUserInfo.isNewUser) {
      const { user } = data;
      console.log({ user });
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
        <Button style={{ width: "100%", marginBottom: 5 }}>
          Login with Google
        </Button>
        <Button style={{ width: "100%" }} onClick={handleLogin}>
          Login with Facebook
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
