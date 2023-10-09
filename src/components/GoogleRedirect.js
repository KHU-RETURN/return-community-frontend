import React from "react";
import Spinner from "../assets/Spinner.gif";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { redirectToGoogle } from "../utils/axios";

function GoogleRedirect() {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    redirectToGoogle(code, navigate, setCookie);
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
