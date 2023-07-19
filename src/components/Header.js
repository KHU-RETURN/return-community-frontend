import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

/** 
  * 모든 페이지에 들어갈 헤더 컴포넌트
  * 랜딩 페이지로 돌아갈 수 있는 메인 로고
  * 각 페이지로 이동 가능한 네비게이션 바(NavBar)
*/
const Header = () => {
  const userId = {};
  const profileImg = "";
  let currentPage = useLocation().pathname;
  return (
    <Wrapper>
      <Link to="/">
          <h2>Return</h2>
      </Link>
      <NavBar>
          <Link
            to="/notice"
            className={
              currentPage === "/notice" ? "current-page" : "nav-element"
            }
          >
            공지사항
          </Link>
          <Link
            to="/reference"
            className={
              currentPage === "/diary" ? "current-page" : "nav-element"
            }
          >
            족보
          </Link>
          <Link
            to="/chat"
            className={
              currentPage === "/chat" ? "current-page" : "nav-element"
            }
          >
            잡담방
          </Link>
          <Link
            to="/diary"
            className={
              currentPage === "/diary" ? "current-page" : "nav-element"
            }
          >
            일기장
          </Link>
          {userId._id ? (
            <Link to="/myPage">
              <ProfileImgContainer>
                {profileImg && <ProfileImage src={profileImg} />}
              </ProfileImgContainer>
            </Link>
          ) : (
            <Link to="/signin">
              <SignInButton>로그인</SignInButton>
            </Link>
          )}
      </NavBar>
    </Wrapper>
  )
}

export default Header

const Wrapper = styled.div`
  margin: 0;
  width: 100vw;
  display: flex;
  flex-direction : row;
  text-align: center;
  justify-content: space-between;
  a{
    text-decoration: none;
    color: #313338;
  }
  .nav-element {
    color: #313338;
    padding: 1rem;
  }

`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImgContainer = styled.div`
  width: 30px;
  height: 30px;
  background: #dbdbdb;
  border-radius: 100px;
  margin-right: 1rem;
`;

const ProfileImage = styled.img``;

const SignInButton = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  border: none;
  border-radius: 10px;
  margin-right: 1rem;
  width: 80px;
  height: 35px;
  box-sizing: border-box;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background: #7054ff;
  :hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`;