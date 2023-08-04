import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useRef } from "react";
import default_profile from "../assets/return_logo.png";

const SignUp = () => {
  const location = useLocation();
  const fullname = location.state.fullname;
  const googleSub = location.state.googleSub;
  const khumail = location.state.khumail;

  const [email, setEmail] = useState(`${khumail}`);
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

  const [isSignUpAvailable, setIsSignUpAvailable] = useState(null);
  const navigate = useNavigate();

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
    if (imgFile) {
      setProfileImg(imgFile);

      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
    }
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
      stuId.length === 10
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
        navigate("/profile");
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

        <CheckMsg
          isVisible={isEmailAvailable !== null}
          isAvailable={isEmailAvailable}
        >
          {isEmailAvailable
            ? "사용 가능한 이메일입니다."
            : "이미 사용 중이거나 경희대 웹메일 양식이 아닙니다."}
        </CheckMsg>

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

        <CheckMsg
          isVisible={isPhoneNumAvailable !== null}
          isAvailable={isPhoneNumAvailable}
        >
          {isPhoneNumAvailable
            ? "사용 가능한 번호입니다."
            : "이미 가입 되었거나 휴대폰 번호 양식이 아닙니다."}
        </CheckMsg>

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

        <CheckMsg
          isVisible={isNicknameAvailable !== null}
          isAvailable={isNicknameAvailable}
        >
          {isNicknameAvailable ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다."}
        </CheckMsg>

        <DivLine>
          <InputForm
            type="text"
            value={stuId}
            onChange={handleStuIdChange}
            maxLength={10}
            placeholder="Student ID"
          />
        </DivLine>

        <ProfileContainer>
          <ProfileText>Profile</ProfileText>
          <ProfileImgView
            src={previewImg}
            alt="프로필 이미지"
          />
          <ProfileBtnContainer>
            <ProfileImgAdd htmlFor="profileImg">이미지 선택</ProfileImgAdd>
            <HiddenInput
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              id="profileImg"
              onChange={handleProfileChange}
              ref={imgRef}
            />
            <ProfileDelete onClick={deleteProfile}>이미지 삭제</ProfileDelete>
          </ProfileBtnContainer>
        </ProfileContainer>

        <SignUpContainer>
          <SignUpBtn onClick={handleSignUp}>Sign Up</SignUpBtn>
          <CheckSignUpMsg
            isVisible={isSignUpAvailable !== null}
            isAvailable={isSignUpAvailable}
          >
            {isSignUpAvailable ? null : "중복 확인 버튼을 모두 확인해주세요."}
          </CheckSignUpMsg>
        </SignUpContainer>
      </FormContainer>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  background: #e3f2fd;
  width: 45vw;
  height: auto;
  overflow: auto;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 30px rgba(35, 35, 35, 0.1);

  &:hover {
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const DivLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputForm = styled.input`
  margin-left: 22%;
  background-color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 7px;
  padding: 14px 15px;
  width: 45%;
  height: 50px;

  &::placeholder {
    color: #4dd0e1;
  }
`;

const DupBtn = styled.button`
  margin-left: 10px;
  margin-right: 22%;
  width: 10%;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  border: none;

  background: #90caf9;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);

  &:hover {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    background: #42a5f5;
  }
`;

const CheckMsg = styled.div`
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  color: ${(props) => (props.isAvailable ? "rgb(0, 140, 186)" : "rgb(250, 85, 85)")};
  margin-left: 23%;
  margin-bottom: 15px;
  margin-top: 3px;
`;

const ProfileContainer = styled.div`
  margin-top: 30px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImgView = styled.img`
  border-radius: 50%;
  width: 240px;
  height: 240px;
  border: 4px solid #90caf9;
`;

const ProfileBtnContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImgAdd = styled.label`
  margin: 10px;
  color: rgb(255, 255, 255);
  font-size: 15px;
  background: #1de9b6;
  height: 32px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    background: #00bfa5;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ProfileDelete = styled.label`
  margin: 10px;
  color: rgb(255, 255, 255);
  font-size: 15px;
  background: #e91e63;
  height: 32px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    background: #c2185b;
  }
`;

const SignUpContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
`;

const SignUpBtn = styled.button`
  width: 15%;
  margin: 0 auto;
  height: 40px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  background: #90caf9;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    background: #42a5f5;
  }
`;

const ProfileText = styled.p`
  color: #4dd0e1;
  font-size: 20px;
`;

const CheckSignUpMsg = styled.div`
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  color: ${(props) => (props.isAvailable ? "rgb(0, 140, 186)" : "rgb(250, 85, 85)")};
  margin: 0 auto;
  margin-bottom: 15px;
  margin-top: 3px;
`;
