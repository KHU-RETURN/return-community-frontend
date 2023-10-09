import { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import default_profile from "../assets/return_logo.png";
import { update, validateNickname, validatePhoneNum } from "../utils/axios";

const UpdateProfile = () => {
  const imgRef = useRef();
  const nicknameRef = useRef();
  const phoneNumRef = useRef();
  const stuIdRef = useRef();

  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  const [beforeState, setBeforeState] = useState({
    studentId: location.state.stuId,
    name: location.state.name,
    nickname: location.state.nickname,
    phoneNumber: location.state.phoneNum,
    email: location.state.email,
  });

  const [afterState, setAfterState] = useState({
    ...beforeState,
  });

  const token = cookies["jwt-token"];
  const [dupMsg, setDupMsg] = useState("");
  const [previewImg, setPreviewImg] = useState(location.state.profileImg);
  const [profileImg, setProfileImg] = useState("");
  const [isChangeProfile, setIsChangeProfile] = useState(false);

  const handleState = (e) => {
    if (e.target.name === "studentId") {
      const value = e.target.value;
      if (/[^0-9]/.test(value)) {
        //숫자만 입력 가능
        return;
      }

      setAfterState((prevAfterState) => ({
        ...prevAfterState,
        studentId: value.slice(0, 10),
      }));
    } else {
      setAfterState({
        ...afterState,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleProfileChange = () => {
    const imgFile = imgRef.current.files[0];
    if (imgFile) {
      // 이미지를 바꾼 경우
      setProfileImg(imgFile);
      setIsChangeProfile(true);

      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
    }
  };

  const deleteProfile = () => {
    setPreviewImg(default_profile);
    setProfileImg("");
    setIsChangeProfile(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleUpdate = async () => {
    let phoneNumAvail = true;
    let stuIdAvail = true;
    let nicknameAvail = true;

    if (beforeState.nickname !== afterState.nickname) {
      nicknameAvail = validateNickname(afterState.nickname, token, setDupMsg, nicknameRef);
    }
    if (beforeState.phoneNumber !== afterState.phoneNumber) {
      phoneNumAvail = validatePhoneNum(afterState.phoneNumber, token, setDupMsg, phoneNumRef);
    }
    if (afterState.studentId.length !== 10) {
      setDupMsg("학번을 다시 확인해주세요");
      stuIdRef.current.focus();
      stuIdAvail = false;
    }

    if (nicknameAvail && phoneNumAvail && stuIdAvail) {
      const userData = {
        ...afterState,
        isProfileImgChanged: isChangeProfile,
      };
      update(userData, profileImg, navigate, token);
    }
  };

  return (
    <Container>
      <div>
        <ProfileImgView
          src={previewImg}
          alt="profile preview"
        />
      </div>
      <div>
        <label htmlFor="profileBtn">프로필 사진 변경</label>
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          id="profileBtn"
          onChange={handleProfileChange}
          ref={imgRef}
        />
        <label onClick={deleteProfile}>프로필 사진 삭제</label>
      </div>

      <br />

      <div>
        <div>{beforeState.email}</div>
      </div>
      <div>
        <input
          ref={nicknameRef}
          name="nickname"
          type="text"
          maxLength={10}
          value={afterState.nickname}
          onChange={handleState}
        />
      </div>
      <div>
        <input
          ref={phoneNumRef}
          name="phoneNumber"
          type="text"
          value={afterState.phoneNumber}
          maxLength={11}
          onChange={handleState}
        />
      </div>
      <div>
        <input
          ref={stuIdRef}
          name="studentId"
          type="text"
          value={afterState.studentId}
          maxLength={10}
          onChange={handleState}
        />
      </div>
      <div>
        <button onClick={handleBack}>취소</button>
        <button onClick={handleUpdate}>변경</button>
      </div>
      {dupMsg}
    </Container>
  );
};

export default UpdateProfile;

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
