import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";

const Profile = () => {
  const [cookies] = useCookies();
  const [state, setState] = useState({
    profileImg: "",
    email: "",
    nickname: "",
    phoneNum: "",
    stuId: "",
  });
  const token = cookies["jwt-token"]; // JWT는 token에 담겨있음
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const imgURL = "";

  const getProfileInfo = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API + `/profile`, {
        headers,
      });
      console.log(res.data);
      setState({
        ...state,
        profileImg: `${process.env.REACT_APP_API}` + `${res.data.profileImgURL}`,
        email: res.data.email,
        nickname: res.data.nickname,
        phoneNum: res.data.phoneNumber,
        stuId: res.data.studentId,
      });
      imgURL = process.env.REACT_APP_API + `${state.profileImg}`;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []); // 초기 설정 (Mount시점에 API 호출)

  return (
    <div>
      <div>{token}</div>
      <div>
        <Imgd src={state.profileImg} />
      </div>
      <div>{state.email}</div>
      <div>{state.nickname}</div>
      <div>{state.phoneNum}</div>
      <div>{state.stuId}</div>
    </div>
  );
};

export default Profile;

const Imgd = styled.img`
  width: 500px;
  height: 500px;
`;
