import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import default_profile from "../assets/return_logo.png";

const Profile = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  const [beforeState, setBeforeState] = useState({
    profileImg: location.state.profileImg,
    email: location.state.email,
    nickname: location.state.nickname,
    phoneNum: location.state.phoneNum,
    stuId: location.state.stuId,
  });
  const token = cookies["jwt-token"];
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [afterState, setAfterState] = useState({
    ...beforeState,
  });

  const [dupMsg, setDupMsg] = useState("");
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditNickname, setIsEditNickname] = useState(false);
  const [isEditPhoneNum, setIsEditPhoneNum] = useState(false);
  const [isEditStuId, setIsEditStuId] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const toggleIsEdit = () => setIsEdit(!isEdit); // isEdit을 반전시키는 토글

  const handleQuitEdit = () => {
    setIsEdit(false);
  };

  const handleState = (e) => {
    setAfterState({
      ...afterState,
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = () => {
    // 뒤로가기 기능 수행
    navigate(-1);
  };

  const handleUpdate = async () => {
    if (beforeState.nickname !== afterState.nickname) {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API + `/validate-nickname/${afterState.nickname}`
        );
        console.log(res.data);
        setDupMsg("사용가능한 닉네임입니다.");
      } catch (error) {
        setDupMsg("이미 존재하는 닉네임입니다.");
      }
    }
    if (beforeState.phoneNum !== afterState.phoneNum) {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API + `/validate-phone-number/${afterState.phoneNum}`
        );
        console.log(res.data);
        setDupMsg("사용가능한 번호입니다.");
      } catch (error) {
        setDupMsg("이미 존재하는 번호입니다.");
      }
    }
  };
  return (
    <div>
      <div>
        <ProfileImgView src={beforeState.profileImg} />
        <button>프로필 사진 변경</button>
      </div>
      <div>
        <div>{beforeState.email}</div>
      </div>
      <div>
        <input
          name="nickname"
          value={afterState.nickname}
          onChange={handleState}
        />
      </div>
      <div>
        <input
          name="phoneNum"
          value={afterState.phoneNum}
          onChange={handleState}
        />
      </div>
      <div>
        <input
          name="stuId"
          value={afterState.stuId}
          onChange={handleState}
          maxLength={10}
        />
      </div>
      <div>
        <button onClick={handleBack}>취소</button>
        <button onClick={handleUpdate}>변경</button>
      </div>
      {dupMsg}
    </div>
  );
};

export default Profile;

const ProfileImgView = styled.img`
  width: 330px;
  height: 330px;
  border-radius: 50%;
  border: 3px solid red;
`;
