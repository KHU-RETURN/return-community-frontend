import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";

const Landing = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const token = cookies["jwt-token"];
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const withdrawTest = async () => {
    try {
      const response = await axios.delete(process.env.REACT_APP_API + `/withdraw`, {
        headers,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      LandingPage
      <h1>Landing</h1>
      <div>{token}</div>
      <button onClick={withdrawTest}>회원탈퇴 테스트</button>
    </div>
  );
};

export default Landing;
