import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import default_profile from "../assets/return_logo.png";

const Profile = () => {
  const imgRef = useRef();
  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  const [beforeState, setBeforeState] = useState({
    profile: location.state.profileImg,
    email: location.state.email,
    nickname: location.state.nickname,
    phoneNum: location.state.phoneNum,
    stuId: location.state.stuId,
  });
  const name = location.state.name;
  const [afterState, setAfterState] = useState({
    ...beforeState,
  });

  const token = cookies["jwt-token"];
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [dupMsg, setDupMsg] = useState("");

  const [previewImg, setPreviewImg] = useState(`${beforeState.profile}`);
  const [profileImg, setProfileImg] = useState("");

  const [isChangeProfile, setIsChangeProfile] = useState(false);

  const handleState = (e) => {
    if (e.target.name === "stuId") {
      const value = e.target.value;
      setAfterState((prevAfterState) => ({
        ...prevAfterState,
        stuId: value.slice(0, 10),
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
  };

  const handleBack = () => {
    // 뒤로가기 기능 수행
    navigate(-1);
  };

  const handleUpdate = async () => {
    let nicknameAvail = true;
    let phoneNumAvail = true;
    let stuIdAvail = true;

    if (beforeState.nickname !== afterState.nickname) {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API + `/validate-nickname/${afterState.nickname}`
        );
        console.log("사용 가능한 닉네임입니다.");
      } catch (error) {
        console.log("이미 존재하는 닉네임입니다.");
        setDupMsg("이미 존재하는 닉네임입니다.");
        nicknameAvail = false;
      }
    }
    if (beforeState.phoneNum !== afterState.phoneNum) {
      try {
        const res = await axios.get(
          process.env.REACT_APP_API + `/validate-phone-number/${afterState.phoneNum}`
        );
        console.log("사용가능한 번호입니다.");
      } catch (error) {
        console.log("이미 가입한 번호이거나 양식이 잘못되었습니다.");
        setDupMsg("이미 가입한 번호이거나 양식이 잘못되었습니다.");
        phoneNumAvail = false;
      }
    }
    if (afterState.stuId.length !== 10) {
      console.log("학번을 다시 확인해주세요");
      setDupMsg("학번을 다시 확인해주세요");
      stuIdAvail = false;
    }

    if (nicknameAvail && phoneNumAvail && stuIdAvail) {
      // 회원 정보 수정 api 연동
      console.log("회원가입 가능합니다");
      const formData = new FormData();

      const userData = {
        studentId: `${afterState.stuId}`,
        name: `${name}`,
        nickname: `${afterState.nickname}`,
        phoneNumber: `${afterState.phoneNum}`,
        email: `${afterState.email}`,
        isProfileImgChanged: isChangeProfile,
      };
      formData.append("updateRequest", JSON.stringify(userData));
      formData.append("profileImg", profileImg);

      try {
        const res = await axios.put(process.env.REACT_APP_API + "/profile", formData, { headers });
        navigate(-1); //이전 페이지 이동
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div>
        <ProfileImgView
          src={previewImg}
          alt="profile preview"
        />
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
      <div>
        <div>{beforeState.email}</div>
      </div>
      <div>
        <input
          name="nickname"
          type="text"
          maxLength={8}
          value={afterState.nickname}
          onChange={handleState}
        />
      </div>
      <div>
        <input
          name="phoneNum"
          type="text"
          value={afterState.phoneNum}
          maxLength={13}
          onChange={handleState}
        />
      </div>
      <div>
        <input
          name="stuId"
          type="text"
          value={afterState.stuId}
          maxLength={10}
          onChange={handleState}
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
  overflow: hidden;
`;
