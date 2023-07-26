import React from "react";
import Spinner from "../assets/Spinner.gif";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GoogleRedirect() {
  const code = new URL(window.location.href).searchParams.get("code");
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    //console.log(code);
    async function GoogleLogin() {
      const headers = {
        "Content-Type": "application/json",
      };

      const res = await axios.post(
        process.env.REACT_APP_API + `/sign-in/google?code=${code}`,
        null,
        { headers }
      );
      // 서버측 response에 Fullname 요소가 있다면 미등록 회원이라는 것임
      // 따라서 서버 응답에 fullname이 있으면 회원가입 폼으로 이동, 아니라면 메인페이지 렌더링
      if (res.data.fullname) {
        navigate("/signup");
        console.log(res.data);
      } else {
        const ACCESS_TOKEN = res.headers["authorization"];
        navigate("/");
      }
    }
    GoogleLogin();
  }, []);

  return (
    // 로딩이 길어질 시 보여지는 화면
    <div>
      <img
        src={Spinner}
        alt="loading"
      />
    </div>
  );
}

export default React.memo(GoogleRedirect);
