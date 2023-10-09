import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getProfileInfo, logOut } from "../utils/axios";

const Profile = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];
  const [userInfo, setUserInfo] = useState({
    profileImg: "",
    email: "",
    nickname: "",
    phoneNum: "",
    stuId: "",
    name: "",
  });

  // 초기 설정 (Mount시점에 API 호출)
  useEffect(() => {
    getProfileInfo(token, setUserInfo);
  }, []);

  const navigateToUpdate = () => {
    navigate("update", {
      state: {
        profileImg: userInfo.profileImg,
        name: userInfo.name,
        email: userInfo.email,
        nickname: userInfo.nickname,
        phoneNum: userInfo.phoneNum,
        stuId: userInfo.stuId,
      },
    });
  };

  return (
    <Container>
      <div>
        <ProfileImgView src={userInfo.profileImg} />
      </div>
      <div>{userInfo.email}</div>
      <div>{userInfo.nickname}</div>
      <div>{userInfo.phoneNum}</div>
      <div>{userInfo.stuId}</div>
      <div>
        <button onClick={navigateToUpdate}>Edit</button>
        <button onClick={() => logOut(token, navigate)}>Log Out</button>
      </div>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;
  width: 100vw;
  height: 100vh;
`;

const ProfileImgView = styled.img`
  width: 330px;
  height: 330px;
  border-radius: 50%;
  overflow: hidden;

  box-shadow: 0px 6px 12px -6px #666;
`;
