import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { useState, useRef } from "react";
import default_profile from "../assets/return_logo.png";

const SignUp = () => {
  const location = useLocation();
  const fullname = location.state.fullname;
  const googleSub = location.state.googleSub;

  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [nickname, setNickname] = useState("");
  const [stuId, setStuId] = useState("");
  const [isDupEmail, setIsDupEmail] = useState(true);
  const [isDupPhone, setIsDupPhone] = useState(true);
  const [isDupName, setIsDupName] = useState(true);
  const [profileImg, setProfileImg] = useState("");
  const imgRef = useRef();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isDuplicatedEmail = () => {
    axios
      .get(process.env.REACT_APP_API + `/validate-email/${email}`)
      .then(() => {
        console.log("사용 가능한 메일입니다");
        setIsDupEmail(false);
      })
      .catch(() => {
        // 서버측에서 ***khu.ac.kr 형식이 아니거나, 이미 등록된 메일인 경우 400 코드 반환
        alert("이미 가입 되었거나 경희대 메일 양식이 아닙니다!");
        setIsDupEmail(true);
        setEmail("");
      });
  };

  const handlePhoneNumChange = (e) => {
    const inputPhoneNum = e.target.value;
    const formattedPhoneNum = formatPhoneNum(inputPhoneNum);
    setPhoneNum(formattedPhoneNum);
  };

  //휴대전화 번호 입력에서 자동으로 하이푼이 들어가게끔 동작
  const formatPhoneNum = (num) => {
    const cleaned = num
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    return cleaned;
  };

  const isDuplicatedPhoneNum = () => {
    const phoneNumWithoutHyphen = phoneNum.replace(/-/g, "");
    axios
      .get(process.env.REACT_APP_API + `/validate-phone-number/${phoneNumWithoutHyphen}`)
      .then(() => {
        console.log("사용 가능한 번호입니다");
        setIsDupPhone(false);
      })
      .catch(() => {
        // 서버측에서 이미 등록된 휴대전화 번호가 있을 때 400 코드 반환
        alert("이미 가입한 번호이거나 올바른 형식이 아닙니다!");
        setIsDupPhone(true);
        setPhoneNum("");
      });
  };

  const handleStuIdChange = (e) => {
    setStuId(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const isDuplicatedNickname = () => {
    console.log("닉네임 중복 확인 api 연결");
  };

  const handleProfileChange = () => {
    const imgFile = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onloadend = () => {
      setProfileImg(reader.result);
    };
  };

  const deleteProfile = () => {
    setProfileImg("");
  };

  const handleSignUp = () => {
    console.log("회원가입 api 연결");
  };

  return (
    <>
      <GlobalStyle />
      {fullname} //
      {googleSub}
      <div>
        이메일 :
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="***.khu.ac.kr"
        />
        <button onClick={isDuplicatedEmail}>중복 확인</button>
        {!isDupEmail && <p>사용 가능한 이메일입니다!</p>}
      </div>
      <div>
        전화번호 :
        <input
          type="text"
          value={phoneNum}
          onChange={handlePhoneNumChange}
          maxLength={13}
          placeholder="휴대폰 번호를 입력해주세요"
        />
        <button onClick={isDuplicatedPhoneNum}>중복 확인</button>
        {!isDupPhone && <p>사용 가능한 번호입니다!</p>}
      </div>
      <div>
        닉네임 :
        <input
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          maxLength={8}
          placeholder="커뮤니티에서 사용할 닉네임을 입력해주세요"
        />
        <button onClick={isDuplicatedNickname}>중복 확인</button>
        {!isDupName && <p>사용 가능한 닉네임입니다!</p>}
      </div>
      <div>
        학번 :
        <input
          type="text"
          value={stuId}
          onChange={handleStuIdChange}
          maxLength={10}
          placeholder="학번을 입력해주세요"
        />
      </div>
      <div>
        <ProfileImg
          src={profileImg ? profileImg : `${default_profile}`}
          alt="프로필 이미지"
        />
        <ProfileImglabel htmlFor="profileImg">프로필 이미지 추가</ProfileImglabel>
        <ProfileInput
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={handleProfileChange}
          ref={imgRef}
        />
        <button onClick={deleteProfile}>프로필 삭제</button>
      </div>
      <button onClick={handleSignUp}>회원 가입</button>
    </>
  );
};

export default SignUp;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

/*
const Email = styled.div``;

const EmailContainer = styled.div``;

const EmailInput = styled.input``;

const EmailSpan = styled.span``;

const EmailLabel = styled.label``;

const EmailBtn = styled.button``;

const PhoneNum = styled.div``;
const PhoneNumberInput = styled.input``;
*/

const ProfileImg = styled.img`
  border-radius: 100px;
  width: 200px;
  height: 200px;
`;

const ProfileImglabel = styled.label`
  margin: 5px 0 20px 0;
  font-weight: bold;
  font-size: 13px;
  display: inline-block;
  cursor: pointer;
`;

const ProfileInput = styled.input`
  display: none;
`;
