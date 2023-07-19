import React from "react";
import styled from "styled-components";

/** 
  * 모든 페이지에 들어갈 푸터 컴포넌트
  * 리턴 로고와 약관, 문의 페이지 등이 연결된 네비게이션 바로 구성
  * 
*/
const Footer = () => {
  return (
    <>
      <Wrapper>
        <h2>Return</h2>
        <NavBar>
          <NavElement className="start">개인정보처리방침</NavElement>
          <NavElement>이용약관</NavElement>
          <NavElement className="end">피드백</NavElement>
        </NavBar>
      </Wrapper>
    </>
  );
};

export default Footer;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 150px;
  position: absolute;
  bottom: 0;
  align-items: center;
  justify-content: space-between;
`;

const NavBar = styled.nav`
  display: flex;
  width: 678px;
  .start {
    border-left: none;
  }
  .end {
    border-right: none;
  }
`;

const NavElement = styled.div`
  height: 16px;
  border-left: 1px solid #8b8b8b;
  border-right: 1px solid #8b8b8b;
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  padding: 0px 66px;
  color: #8b8b8b;
  cursor: pointer;
`;
