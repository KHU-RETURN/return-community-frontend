import axios from "axios";
import default_profile from "../assets/return_logo.png";

const API_URL = process.env.REACT_APP_API;

export const redirectToGoogle = (code, navigate, setCookie) => {
  let config = {
    method: "post",
    url: API_URL + `/sign-in/google?code=${code}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .request(config)
    .then((response) => {
      if (response.data.fullname) {
        navigate("/signup", {
          state: {
            fullname: response.data.fullname,
            googleSub: response.data.googleSub,
            khumail: response.data.email,
          },
        });
        console.log(response.data);
      } else {
        const token = response.headers.authorization;
        setCookie("jwt-token", token, { path: "/", secure: true });
        navigate("/");
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProfileInfo = (token, setUserInfo) => {
  let config = {
    method: "get",
    url: API_URL + `/profile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
      let profileImg = response.data.profileImgURL;
      if (profileImg === null) {
        profileImg = default_profile;
      } else {
        profileImg = `${API_URL}` + `${response.data.profileImgURL}`;
      }
      setUserInfo({
        profileImg: profileImg,
        name: response.data.name,
        email: response.data.email,
        nickname: response.data.nickname,
        phoneNum: response.data.phoneNumber,
        stuId: response.data.studentId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logOut = (token, navigate) => {
  let config = {
    method: "get",
    url: API_URL + `/sign-out`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      navigate("/signin");
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

/* SignUp page axios */
export const isDuplicatedEmail = (email, setIsEmailAvailable, emailRef) => {
  let config = {
    method: "get",
    url: API_URL + `/validate-email/${email}`,
  };

  axios
    .request(config)
    .then(() => {
      setIsEmailAvailable(true);
    })
    .catch((error) => {
      emailRef.current.focus();
      setIsEmailAvailable(false);
    });
};

export const isDuplicatedNickname = (nickname, setIsNicknameAvailable, nicknameRef) => {
  let config = {
    method: "get",
    url: API_URL + `/validate-nickname/${nickname}`,
  };

  axios
    .request(config)
    .then(() => {
      setIsNicknameAvailable(true);
    })
    .catch(() => {
      nicknameRef.current.focus();
      setIsNicknameAvailable(false);
    });
};

export const isDuplicatedPhoneNum = (phoneNum, setIsPhoneNumAvailable, phoneNumRef) => {
  const phoneNumWithoutHyphen = phoneNum.replace(/-/g, "");
  let config = {
    method: "get",
    url: API_URL + `/validate-phone-number/${phoneNumWithoutHyphen}`,
  };

  axios
    .request(config)
    .then(() => {
      setIsPhoneNumAvailable(true);
    })
    .catch(() => {
      phoneNumRef.current.focus();
      setIsPhoneNumAvailable(false);
    });
};

export const reqSignUp = (initialInfo, profileImg, navigate) => {
  const phoneNumWithoutHyphen = initialInfo.phoneNumber.replace(/-/g, "");
  const formData = new FormData();

  const userData = { ...initialInfo, phoneNumber: phoneNumWithoutHyphen };

  formData.append("signUpRequest", JSON.stringify(userData));
  formData.append("profileImg", profileImg);

  let config = {
    method: "post",
    url: API_URL + "/sign-up",
    data: userData,
  };

  axios
    .request(config)
    .then((response) => {
      navigate("/profile");
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
