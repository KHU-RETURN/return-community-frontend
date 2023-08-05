import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import default_profile from "../assets/return_logo.png";

const Profile = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [state, setState] = useState({
    profileImg: "",
    email: "",
    nickname: "",
    phoneNum: "",
    stuId: "",
    name: "",
  });
  const token = cookies["jwt-token"]; // JWT는 token에 담겨있음
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    getProfileInfo();
  }, []); // 초기 설정 (Mount시점에 API 호출)

  const getProfileInfo = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API + `/profile`, {
        headers,
      });
      console.log(res.data);
      let profileImg = res.data.profileImgURL;
      if (profileImg === null) {
        profileImg = default_profile;
      } else {
        profileImg = `${process.env.REACT_APP_API}` + `${res.data.profileImgURL}`;
      }
      setState({
        profileImg: profileImg,
        name: res.data.name,
        email: res.data.email,
        nickname: res.data.nickname,
        phoneNum: res.data.phoneNumber,
        stuId: res.data.studentId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const LinkPage = () => {
    navigate("update", {
      state: {
        profileImg: state.profileImg,
        name: state.name,
        email: state.email,
        nickname: state.nickname,
        phoneNum: state.phoneNum,
        stuId: state.stuId,
      },
    });
  };

  return (
    <div>
      <div>
        <ProfileImgView src={state.profileImg} />
      </div>
      <div>{state.email}</div>
      <div>{state.nickname}</div>
      <div>{state.phoneNum}</div>
      <div>{state.stuId}</div>
      <div>
        <button onClick={LinkPage}>Edit</button>
      </div>
    </div>
  );
};

export default Profile;

const ProfileImgView = styled.img`
  width: 330px;
  height: 330px;
  border-radius: 50%;
  overflow: hidden;
`;
