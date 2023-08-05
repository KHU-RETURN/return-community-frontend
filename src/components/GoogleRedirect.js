import React from "react";
import Spinner from "../assets/Spinner.gif";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";

import axios from "axios";

function GoogleRedirect() {
  const [cookies, setCookie] = useCookies();

  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    async function GoogleLogin() {
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        const res = await axios.post(
          process.env.REACT_APP_API + `/sign-in/google?code=${code}`,
          null,
          { headers }
        );
        // 서버측 response에 fullname 필드가 있으면 미등록 회원
        // 따라서 서버 응답에 fullname 필드가 있으면 회원가입 폼으로 이동, 아니라면 메인페이지 렌더링
        if (res.data.fullname) {
          navigate("/signup", {
            state: {
              fullname: res.data.fullname,
              googleSub: res.data.googleSub,
              khumail: res.data.email,
            },
          });
          console.log(res.data);
        } else {
          const token = res.headers.authorization; // JWT 토큰이 서버 응답 헤더의 Authorization value로 들어있음
          setCookie("jwt-token", token, { path: "/", secure: true });
          navigate("/");
          console.log("로그인 되었습니다");
          console.log(res.data);
        }
      } catch (error) {
        console.log("에러 : ", error);
      }
    }
    GoogleLogin();
  }, []);

  return (
    <Container>
      <SpinnerImg
        src={Spinner} // 로딩될 때 보여지는 화면 (스피너)
        alt="loading"
      />
    </Container>
  );
}

export default React.memo(GoogleRedirect);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const SpinnerImg = styled.img`
  height: 150px;
  width: 150px;
`;
