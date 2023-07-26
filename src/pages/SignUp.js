import axios from "axios";
import React from "react";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isDuplicatedEmail = () => {
    axios
      .get(process.env.REACT_APP_API + `/validate-email/${email}`)
      .then(() => {
        console.log("사용 가능한 메일입니다");
      })
      .catch(() => {
        // 서버측에서 ***khu.ac.kr 형식이 아니거나, 이미 등록된 메일인 경우 400 코드 반환
        alert("이미 가입 되었거나 경희대 메일 양식이 아닙니다!");
        setEmail("");
      });
  };

  const handlePhoneNumChange = (e) => {
    const inputPhoneNum = e.target.value;
    const formattedPhoneNum = formatPhoneNum(inputPhoneNum);
    setPhoneNum(formattedPhoneNum);
  };

  const formatPhoneNum = (num) => {
    const cleaned = num.replace(/[^0-9]/g, "");

    if (cleaned.length >= 11) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }

    // 입력된 번호가 7자리 이상인 경우
    if (cleaned.length >= 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    }

    // 그 외의 경우는 그냥 반환
    return cleaned;
  };

  const isDuplicatedPhoneNum = () => {
    const phoneNumWithoutHyphen = phoneNum.replace(/-/g, "");
    axios
      .get(process.env.REACT_APP_API + `/validate-phone-number/${phoneNumWithoutHyphen}`)
      .then(() => {
        console.log("사용 가능한 번호입니다");
      })
      .catch(() => {
        // 서버측에서 이미 등록된 휴대전화 번호가 있을 때 400 코드 반환
        alert("이미 가입한 번호이거나 올바른 형식이 아닙니다!");
        setPhoneNum("");
      });
  };

  return (
    <div>
      <div>
        이메일 :
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="***.khu.ac.kr"
        />
        <button onClick={isDuplicatedEmail}>중복 확인</button>
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
      </div>
    </div>
  );
};

export default SignUp;
