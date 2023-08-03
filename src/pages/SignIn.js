import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignIn = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  return (
    <Container>
      <LogInBox>
        <GoogleText> Google SIGN-IN </GoogleText>
        <Link
          to={`https://accounts.google.com/o/oauth2/v2/auth?scope=openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scope=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:8080/code&client_id=${CLIENT_ID}`}
        >
          <GoogleBtn>CONNECT WITH GOOGLE</GoogleBtn>
        </Link>
      </LogInBox>
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  background: #4688f1;
  padding: 0;
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const LogInBox = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 480px;
  margin: 0 auto;
  text-align: center;
  letter-spacing: 1px;
  position: relative;

  &:hover {
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const GoogleText = styled.h2`
  margin: 20px 0 20px;
  font-size: 27px;
  padding: 0;
  text-transform: uppercase;
  color: #4688f1;
`;

const GoogleBtn = styled.button`
  background-position: 25px 0px;
  box-sizing: border-box;
  color: rgb(220, 74, 61);
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  height: 50px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;
  width: 100%;
  border-radius: 3px;
  margin: 10px auto;
  outline: rgb(255, 255, 255) none 0px;
  transition: all 0.2s cubic-bezier(0.72, 0.01, 0.56, 1) 0s;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;

  background: rgb(255, 255, 255)
    url("https://raw.githubusercontent.com/eswarasai/social-login/master/img/google-plus.png")
    no-repeat scroll 5px 0px / 50px 50px padding-box border-box;
  border: 1px solid rgb(220, 74, 61);

  &:hover {
    border-color: rgb(220, 74, 61);
    background: rgb(220, 74, 61)
      url("https://raw.githubusercontent.com/eswarasai/social-login/master/img/google-plus-white.png")
      no-repeat scroll 5px 0px / 50px 50px padding-box border-box;
    -webkit-transition: all 0.8s ease-out;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease-out;
    color: rgb(255, 255, 255);
  }
`;
