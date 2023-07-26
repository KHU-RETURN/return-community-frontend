import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  return (
    <div>
      SignIn
      <h1> 로그인 페이지 </h1>
      <Link
        to={`https://accounts.google.com/o/oauth2/v2/auth?scope=openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scope=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:8080/code&client_id=${CLIENT_ID}`}
      >
        Google로그인
      </Link>
    </div>
  );
};

export default SignIn;
