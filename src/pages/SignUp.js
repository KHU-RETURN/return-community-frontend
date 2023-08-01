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
      {fullname}
      {googleSub}
      <EmailContainer>
        이메일 :
        <EmailInput
          ref={emailRef}
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="***.khu.ac.kr"
        />
        <button onClick={isDuplicatedEmail}>중복 확인</button>
        {isEmailAvailable === true && <p>사용 가능한 이메일입니다!</p>}
        {isEmailAvailable === false && <p>이미 가입 되었거나 경희대 메일 양식이 아닙니다! </p>}
      </EmailContainer>
      <div>
        전화번호 :
        <input
          ref={phoneNumRef}
          type="text"
          value={phoneNum}
          onChange={handlePhoneNumChange}
          maxLength={13}
          placeholder="휴대폰 번호를 입력해주세요"
        />
        <button onClick={isDuplicatedPhoneNum}>중복 확인</button>
        {isPhoneNumAvailable === true && <p>사용 가능한 번호입니다!</p>}
        {isPhoneNumAvailable === false && <p>이미 가입 되었거나 휴대폰 번호 양식이 아닙니다!</p>}
      </div>
      <div>
        닉네임 :
        <input
          ref={nicknameRef}
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          maxLength={8}
          placeholder="커뮤니티에서 사용할 닉네임을 입력해주세요"
        />
        <button onClick={isDuplicatedNickname}>중복 확인</button>
        {isNicknameAvailable === true && <p>사용 가능한 닉네임입니다!</p>}
        {isNicknameAvailable === false && <p>이미 사용 중인 닉네임입니다!</p>}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EmailContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const EmailInput = styled.input`
  width: 200px;
  height: 32px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
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

const ProfileImgView = styled.img`
  border-radius: 50%;
  width: 240px;
  height: 240px;
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
