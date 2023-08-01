import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
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

  const [isEmailAvailable, setIsEmailAvailable] = useState(null);
  const [isPhoneNumAvailable, setIsPhoneNumAvailable] = useState(null);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
  const [profileImg, setProfileImg] = useState(""); // profileImg : 서버로 보내는 사용자 지정 이미지
  const [previewImg, setPreviewImg] = useState(default_profile);
  const imgRef = useRef();
  // previewImg : 서버로 보내는 이미지가 아닌, 파일 첨부로부터 미리 보는 프로필 사진
  // 서버로 보내는 파일이랑 형식이 달라서 따로 지정함

  const emailRef = useRef(); // email input 태그에 focus를 하기 위함
  const phoneNumRef = useRef();
  const nicknameRef = useRef();
  const stuIdRef = useRef();

  const [isSignUpAvailable, setIsSignUpAvailable] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // 이메일 중복 확인 버튼을 눌렀을 때 동작
  const isDuplicatedEmail = () => {
    axios
      .get(process.env.REACT_APP_API + `/validate-email/${email}`)
      .then(() => {
        console.log("사용 가능한 메일입니다");
        setIsEmailAvailable(true);
      })
      .catch(() => {
        // 서버측에서 ***khu.ac.kr 형식이 아니거나, 이미 등록된 메일인 경우 400 코드 반환
        emailRef.current.focus();
        setIsEmailAvailable(false);
      });
  };

  // 전화번호 input 태그에 입력 이벤트가 발생했을 때 동작
  const handlePhoneNumChange = (e) => {
    const inputPhoneNum = e.target.value;
    const formattedPhoneNum = formatPhoneNum(inputPhoneNum);
    setPhoneNum(formattedPhoneNum);
  };

  //휴대전화 input에 자동으로 하이푼이 들어가게끔 동작
  const formatPhoneNum = (num) => {
    const cleaned = num
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    return cleaned;
  };

  // 전화번호 중복 확인 버튼을 눌렀을 때 동작
  const isDuplicatedPhoneNum = () => {
    const phoneNumWithoutHyphen = phoneNum.replace(/-/g, "");
    axios
      .get(process.env.REACT_APP_API + `/validate-phone-number/${phoneNumWithoutHyphen}`)
      .then(() => {
        setIsPhoneNumAvailable(true);
      })
      .catch(() => {
        phoneNumRef.current.focus();
        setIsPhoneNumAvailable(false);
      });
  };

  const handleStuIdChange = (e) => {
    setStuId(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // 닉네임 중복 확인 버튼을 눌렀을 때 동작
  const isDuplicatedNickname = () => {
    axios
      .get(process.env.REACT_APP_API + `/validate-nickname/${nickname}`)
      .then(() => {
        setIsNicknameAvailable(true);
      })
      .catch(() => {
        nicknameRef.current.focus();
        setIsNicknameAvailable(false);
      });
  };

  // 프로필 이미지 추가 버튼을 눌렀을 때 동작
  const handleProfileChange = () => {
    const imgFile = imgRef.current.files[0];
    setProfileImg(imgFile);

    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
  };

  //프로필 삭제 버튼 눌렀을 때 동작
  const deleteProfile = () => {
    setPreviewImg(default_profile); // 기본 이미지(리턴 로고)로 설정
    setProfileImg(""); // 서버로 보내는 사진은 null
  };

  //회원가입 버튼 눌렀을 때 동작
  const handleSignUp = async () => {
    if (
      isEmailAvailable === true &&
      isPhoneNumAvailable === true &&
      isNicknameAvailable === true &&
      stuId.length < 10
    ) {
      setIsSignUpAvailable(true);
      const phoneNumWithoutHyphen = phoneNum.replace(/-/g, "");
      const formData = new FormData();

      const userData = {
        googleSub: `${googleSub}`,
        phoneNumber: `${phoneNumWithoutHyphen}`,
        email: `${email}`,
        name: `${fullname}`,
        nickname: `${nickname}`,
        studentId: `${stuId}`,
      };

      formData.append("signUpRequest", JSON.stringify(userData));
      formData.append("profileImg", profileImg);

      try {
        const response = await axios.post(process.env.REACT_APP_API + "/sign-up", formData);
        console.log(response.data);
      } catch (error) {
        console.error("Error making POST request:", error);
      }
    } else {
      setIsSignUpAvailable(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <DivLine>
          <InputForm
            ref={emailRef}
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="KHU Email"
          />
          <DupBtn onClick={isDuplicatedEmail}>중복 확인</DupBtn>
        </DivLine>

        {isEmailAvailable === true && <div>사용 가능한 이메일입니다!</div>}
        {isEmailAvailable === false && <div>이미 가입 되었거나 경희대 메일 양식이 아닙니다! </div>}

        <Horizaontal></Horizaontal>

        <DivLine>
          <InputForm
            ref={phoneNumRef}
            type="text"
            value={phoneNum}
            onChange={handlePhoneNumChange}
            maxLength={13}
            placeholder="Phone Number"
          />
          <DupBtn onClick={isDuplicatedPhoneNum}>중복 확인</DupBtn>
        </DivLine>
        {isPhoneNumAvailable === true && <div>사용 가능한 번호입니다!</div>}
        {isPhoneNumAvailable === false && (
          <div>이미 가입 되었거나 휴대폰 번호 양식이 아닙니다!</div>
        )}

        <DivLine>
          <InputForm
            ref={nicknameRef}
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            maxLength={8}
            placeholder="Nickname"
          />
          <DupBtn onClick={isDuplicatedNickname}>중복 확인</DupBtn>
        </DivLine>
        {isNicknameAvailable === true && <div>사용 가능한 닉네임입니다!</div>}
        {isNicknameAvailable === false && <div>이미 사용 중인 닉네임입니다!</div>}

        <DivLine>
          <InputForm
            type="text"
            value={stuId}
            onChange={handleStuIdChange}
            maxLength={10}
            placeholder="Student ID"
          />
        </DivLine>

        <ProfileContiner>
          <ProfileImgView
            src={previewImg}
            alt="프로필 이미지"
          />
        </ProfileContiner>
      </FormContainer>

      <div>
        <ProfileImgView
          src={previewImg}
          alt="프로필 이미지"
        />
        <ProfileImgAdd htmlFor="profileImg">프로필 이미지 추가</ProfileImgAdd>
        <HiddenInput
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={handleProfileChange}
          ref={imgRef}
        />
        <ProfileDelete onClick={deleteProfile}>프로필 삭제</ProfileDelete>
      </div>

      <button onClick={handleSignUp}>회원 가입</button>
      {isSignUpAvailable === false && <div>모든 중복 확인을 해주십시오.</div>}
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  border: 1px solid blue;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputForm = styled.input`
  margin-left: 27%;
  background-color: #eee;
  font-size: 18px;
  border: none;
  border-radius: 7px;
  padding: 12px 15px;
  width: 35%;
  height: 50px;
`;

const DupBtn = styled.button`
  margin-left: 10px;
  margin-right: 27%;
  width: 8%;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  cursor: pointer;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
    4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: rgb(96, 9, 240);
  background: linear-gradient(0deg, rgba(0, 140, 186, 1) 0%, rgba(10, 160, 240, 1) 100%);
  border: none;

  &:before {
    height: 0%;
    width: 2px;
  }

  &:hover {
    box-shadow: 1px 1px 2px 0 rgba(255, 255, 255, 0.5), -1px -1px 2px 0 rgba(116, 125, 136, 0.5),
      inset -1px -1px 2px 0 rgba(255, 255, 255, 0.2), inset 1px 1px 2px 0 rgba(0, 0, 0, 0.4);
  }
`;

// 프로필 사진 부분
const ProfileImgView = styled.img`
  border-radius: 50%;
  width: 240px;
  height: 240px;
  border: 1px solid gray;
`;

const ProfileImgAdd = styled.label`
  margin: 5px 0 20px 0;
  font-weight: bold;
  font-size: 13px;
  display: inline-block;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ProfileDelete = styled.label`
  margin: 5px 0 20px 0;
  font-weight: bold;
  font-size: 13px;
  display: inline-block;
  cursor: pointer;
`;

const FormContainer = styled.div`
  border: 1.5px solid blue;
  margin-top: 100px;
  width: 90vw;
  height: auto;
`;

const DivLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const ProfileContiner = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid blue;
`;

const Horizaontal = styled.hr`
  border: 0px solid;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 140, 186, 0.5),
    rgba(0, 0, 0, 0)
  );
  margin-top: 50px;
`;
