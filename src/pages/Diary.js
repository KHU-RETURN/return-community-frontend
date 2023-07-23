import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as WriteIcon } from "../assets/pen.svg"
import { DiaryList } from '../store/fakeDiary'
import PaginationBar from '../components/diary/PaginationBar'
import { useLocation } from 'react-router-dom'
import { getDiaryList } from '../utils/axios'
import WritePostModal from '../components/diary/WritePostModal'

/**
 * To do
 * 1. PageSizeRegulator, DiaryBlock 컴포넌트 분리, 추상화 요망
 * 2. 게시물 작성 UI(Modal) 제작, Post /diary     
 */

const Diary = () => {
  const currentURL = useLocation().search
  const diaryList = [...DiaryList]
  const [currentPage, setcurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [numberOfPages, setNumberOfPages] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState("게시물에 추가");

  const handleModalOpen = () => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };

  useEffect(() => {
    const extractPageNumFromURL = () => {
      const urlParams = new URLSearchParams(currentURL)
      const pageParam = urlParams.get('page')
      pageParam && setcurrentPage(isNaN(parseInt(pageParam, 10)) ? 1 : parseInt(pageParam, 10))
      return parseInt(pageParam,10);
    }
    getDiaryList(extractPageNumFromURL(), pageSize)
    setNumberOfPages((diaryList.length / pageSize) + 1)
  }, [currentURL, pageSize, diaryList.length])
  
  return (
    <>
        <StyledComponent>diary</StyledComponent>
        <WritePostButton onClick={handleModalOpen} >
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
          {/** To do: 현재 서버의 일기장 리스트가 비어있는 관계로 /store/fakeDiary.js 의 가짜 데이터를 사용중, 추후 서버에 일기장 데이터 추가 시 변경 요망 */}
          {diaryList.map((post) => (
            <DiaryBlock>
              <Title>{post.title}</Title>
              <Content>{post.content || "내용이 없다"}</Content>
            </DiaryBlock>
          ))}
        </DiaryListContainer>
        <PaginationBar currentPage={currentPage} totalPages={numberOfPages} setPage={setcurrentPage}/>
        {isModalOpen && (
          <WritePostModal
            setIsModalOpen={setIsModalOpen}
            name="김수한무거북이"
            fileName={fileName}
            setFileName={setFileName}
          />
        )}
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