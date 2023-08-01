import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";

const Profile = () => {
  const [cookies] = useCookies();
  const token = cookies["jwt-token"]; // JWT는 token에 담겨있음
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getProfileInfo = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API + `/profile`, {
        headers,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []); // 초기 설정 (Mount시점에 API 호출)

  return (
    <div>
      My profile
      <div>{token}</div>
    </div>
  );
};

export default Profile;
