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
        profileImg = `${API_URL}${response.data.profileImgURL}`;
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
export const isDuplicatedEmail = (email, setAvailable, emailRef) => {
  let config = {
    method: "get",
    url: API_URL + `/validate-email/${email}`,
  };

  axios
    .request(config)
    .then(() => {
      setAvailable((prevState) => ({ ...prevState, email: true }));
    })
    .catch((error) => {
      emailRef.current.focus();
      setAvailable((prevState) => ({ ...prevState, email: false }));
    });
};

export const isDuplicatedNickname = (nickname, setAvailable, nicknameRef) => {
  let config = {
    method: "get",
    url: API_URL + `/validate-nickname/${nickname}`,
  };

  axios
    .request(config)
    .then(() => {
      setAvailable((prevState) => ({ ...prevState, nickname: true }));
    })
    .catch(() => {
      nicknameRef.current.focus();
      setAvailable((prevState) => ({ ...prevState, nickname: false }));
    });
};

export const isDuplicatedPhoneNum = (phoneNum, setAvailable, phoneNumRef) => {
  const phoneNumWithoutHyphen = phoneNum.replace(/-/g, "");
  let config = {
    method: "get",
    url: API_URL + `/validate-phone-number/${phoneNumWithoutHyphen}`,
  };

  axios
    .request(config)
    .then(() => {
      setAvailable((prevState) => ({ ...prevState, phoneNum: true }));
    })
    .catch(() => {
      phoneNumRef.current.focus();
      setAvailable((prevState) => ({ ...prevState, phoneNum: false }));
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
    data: formData,
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

/* UpdateProfile page axios */
export const validateNickname = async (nickname, token, setDupMsg, nicknameRef) => {
  let config = {
    method: "get",
    url: API_URL + `/validate-nickname/${nickname}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .request(config)
    .then(() => {
      console.log("사용 가능한 닉네임입니다.");
      return true;
    })
    .catch(() => {
      console.log("이미 존재하는 닉네임입니다.");
      setDupMsg("이미 존재하는 닉네임입니다.");
      nicknameRef.current.focus();
      return false;
    });
};

export const validatePhoneNum = async (phoneNum, token, setDupMsg, phoneNumRef) => {
  let config = {
    method: "get",
    url: API_URL + `/validate-phone-number/${phoneNum}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .request(config)
    .then(() => {
      console.log("사용 가능한 번호입니다.");
      return true;
    })
    .catch(() => {
      console.log("이미 가입한 번호이거나 양식이 잘못되었습니다");
      setDupMsg("이미 가입한 번호이거나 양식이 잘못되었습니다");
      phoneNumRef.current.focus();
      return false;
    });
};

export const update = (userData, profileImg, navigate, token) => {
  const formData = new FormData();
  formData.append("updateRequest", JSON.stringify(userData));
  formData.append("profileImg", profileImg);

  let config = {
    method: "put",
    url: API_URL + "/profile",
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      navigate(-1);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
