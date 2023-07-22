import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as WriteIcon } from "../assets/pen.svg";
import { DiaryList } from '../store/fakeDiary'
import PaginationBar from '../components/diary/PaginationBar'
import { useLocation } from 'react-router-dom';
import { getDiaryList } from '../utils/axios';

const Diary = () => {
  const currentURL = useLocation().search;
  const diaryList = [...DiaryList]
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    const extractPageNumFromURL = () => {
      const urlParams = new URLSearchParams(currentURL);
      const pageParam = urlParams.get('page');
      pageParam && setcurrentPage(isNaN(parseInt(pageParam, 10)) ? 1 : parseInt(pageParam, 10));
    }
    extractPageNumFromURL();
    getDiaryList(1, 1);
  }, [currentURL]);
  
  return (
    <>
        <StyledComponent>diary</StyledComponent>
        <WritePostButton>
            <WriteIcon fill="white" width="2.5vw" />
          </WritePostButton>
        <DiaryListContainer>
          {diaryList.map((post) => (
            <DiaryBlock>
              <Title>{post.title}</Title>
              <Content>{post.content || "내용이 없다"}</Content>
            </DiaryBlock>
          ))}
        </DiaryListContainer>
        <PaginationBar currentPage={currentPage} totalPages={10} setPage={setcurrentPage}/>
    </>
  )
}

export default Diary

const StyledComponent = styled.div`
`;

const WritePostButton = styled.div`
  right: 10vw;
  bottom: 10vh;
  position : absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7vw;
  height: 7vh;
  background: #7054ff;
  border-radius: 100px;
  margin-left: 34px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`;

const DiaryListContainer = styled.div`
  width: 100vw;
  text-align: center;
`;

const DiaryBlock = styled.div`
  width: 300px;
  margin: auto;
  border : 1px solid
`;

const Title = styled.div``;

const Content = styled.div``;