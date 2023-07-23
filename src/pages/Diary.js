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
  const [pageSize, setPageSize] = useState(3);
  const [numberOfPages, setNumberOfPages] = useState()

  useEffect(() => {
    const extractPageNumFromURL = () => {
      const urlParams = new URLSearchParams(currentURL);
      const pageParam = urlParams.get('page');
      pageParam && setcurrentPage(isNaN(parseInt(pageParam, 10)) ? 1 : parseInt(pageParam, 10));
      getDiaryList(parseInt(pageParam, 10), pageSize);
      setNumberOfPages((diaryList.length / pageSize) + 1)
    }
    extractPageNumFromURL();
  }, [currentURL, pageSize, diaryList.length]);
  
  return (
    <>
        <StyledComponent>diary</StyledComponent>
        <WritePostButton>
            <WriteIcon fill="white" width="40px" />
          </WritePostButton>
        <DiaryListContainer>
          <PageSizeRegulator>
            페이지 당 게시물 개수
            <RegulatorButton type="radio" id="1" name="pageSize" value="1" classname={pageSize === 1 ? "selected" : "non-selected"} onChange={()=>setPageSize(1)}/>
            <label for="1">1</label>
            <RegulatorButton type="radio" id="5" name="pageSize" value="5" classname={pageSize === 5 ? "selected" : "non-selected"} onChange={()=>setPageSize(5)}/>
            <label for="5">5</label>
            <RegulatorButton type="radio" id="10" name="pageSize" value="10" classname={pageSize === 10 ? "selected" : "non-selected"} onChange={()=>setPageSize(10)}/>
            <label for="10">10</label>
          </PageSizeRegulator>
          {diaryList.map((post) => (
            <DiaryBlock>
              <Title>{post.title}</Title>
              <Content>{post.content || "내용이 없다"}</Content>
            </DiaryBlock>
          ))}
        </DiaryListContainer>
        <PaginationBar currentPage={currentPage} totalPages={numberOfPages} setPage={setcurrentPage}/>
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
  width: 128px;
  height: 128px;
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

const PageSizeRegulator = styled.div``;

const RegulatorButton = styled.input``;

const DiaryBlock = styled.div`
  width: 300px;
  margin: auto;
  border : 1px solid
`;

const Title = styled.div``;

const Content = styled.div``;