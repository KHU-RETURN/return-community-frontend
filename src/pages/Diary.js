import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as WriteIcon } from "../assets/pen.svg"
import PaginationBar from '../components/diary/PaginationBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { getDiaryDetail, getDiaryList } from '../utils/axios'
import WritePostModal from '../components/diary/WritePostModal'
import SearchBar from '../components/SearchBar'

/**
 * To do
 * 1. PageSizeRegulator, DiaryBlock 컴포넌트 분리, 추상화 요망   
 */

const Diary = () => {
  const currentURL = useLocation().search
  const navigate = useNavigate();
  const STATIC_URL = process.env.REACT_APP_API;
  const [diaryList, setDiaryList] = useState([])

  const [currentPage, setcurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [numberOfPages, setNumberOfPages] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchContent, setsearchContent] = useState('')
  const searchedList = searchContent === "" ? diaryList : diaryList.filter((post) =>
    post.title.toLowerCase().includes(searchContent.toLowerCase()) === true
  )

  const handleModalOpen = () => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };

  const handleSearch = (e) => {
    const newValue = e.currentTarget.value;
    setsearchContent(newValue);
  }

  const handlePostClick = async (post) => {
    const postDetail = await getDiaryDetail(post.postId);
    
  }

  useEffect(() => {
    const extractPageNumFromURL = () => {
      const urlParams = new URLSearchParams(currentURL)
      const pageParam = urlParams.get('page')
      !!pageParam && setcurrentPage(isNaN(parseInt(pageParam, 10)) ? 1 : parseInt(pageParam, 10))
      return currentPage;
    }
    getDiaryList(extractPageNumFromURL(), "createdAt", setDiaryList)
  }, [currentURL, currentPage, pageSize])
  
  useEffect(() => {
    setNumberOfPages((diaryList.length / pageSize) + 1)
  }, [diaryList.length, pageSize])
  

  return (
    <>
        <StyledComponent>diary</StyledComponent>
        <WritePostButton onClick={handleModalOpen} >
            <WriteIcon fill="white" width="40px" />
        </WritePostButton>
        <PageBody>
          <SearchBar 
            width="600px"
            height="44px"
            fontSize="21px"
            placeholder="검색할 내용을 입력하세요"
            value={searchContent}
            onChange={handleSearch}
          />
          <DiaryListContainer>
            <PageSizeRegulator>
              페이지 당 게시물 개수
              <RegulatorButton type="radio" id="1" name="pageSize" value="1" className={pageSize === 1 ? "selected" : "non-selected"} onChange={()=>setPageSize(1)}/>
              <label htmlFor="1">1</label>
              <RegulatorButton type="radio" id="5" name="pageSize" value="5" className={pageSize === 5 ? "selected" : "non-selected"} onChange={()=>setPageSize(5)}/>
              <label htmlFor="5">5</label>
              <RegulatorButton type="radio" id="10" name="pageSize" value="10" className={pageSize === 10 ? "selected" : "non-selected"} onChange={()=>setPageSize(10)}/>
              <label htmlFor="10">10</label>
            </PageSizeRegulator>
            {searchedList ? (searchedList.map((diary) => (
              <DiaryBlock key={diary.id} onClick={() => {getDiaryDetail(diary.diaryId, navigate)}}>
                <DiaryHeader>
                  <ThumbnailBox>
                    {diary.thumbnailImgURL ? <ThumbnailImg src={`${STATIC_URL + diary.thumbnailImgURL}`} alt="Thumbnail"/> : <EmptyThumbnailImg alt="EmptyThumbnail" />}
                  </ThumbnailBox>
                  <Title>{diary.title}</Title>
                </DiaryHeader>
                <DiaryBody>
                  <AuthorBlock>
                    <AuthorProfileImg src={`${STATIC_URL + diary.member.profileImgURL}`} />
                    <Author>{diary.member.name}</Author>
                  </AuthorBlock>
                  <DiaryInfoBlock>
                    <ViewCount>조회수 {diary.viewCount}</ViewCount>
                    <LikeCount>👍 {diary.likeCount}</LikeCount>
                    <CommentCount>댓글 {diary.commentCount}</CommentCount>
                  </DiaryInfoBlock>
                </DiaryBody>
              </DiaryBlock>
            ))): "Loading"}
          </DiaryListContainer>
          <PaginationBar currentPage={currentPage} totalPages={numberOfPages} setPage={setcurrentPage}/>
          {isModalOpen && (
            <WritePostModal
              setIsModalOpen={setIsModalOpen}
              name="김수한무거북이"
            />
          )}
      </PageBody>
    </>
  )
}

export default Diary

const StyledComponent = styled.div`
`;

const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  justify-content: center;
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
  width: 800px;
  margin: auto;
  border : 1px solid
`;

const DiaryHeader = styled.div`
  display: flex;
  align-items: center;
`;

const DiaryBody = styled.div`
  display: flex;
  justify-content: right;
`;

const Title = styled.div``;

const ThumbnailBox = styled.div`
  width: 64px;
  height: 64px;
  background: #f1f1f1;
  margin: 10px;
`;

const ThumbnailImg = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
`;

const EmptyThumbnailImg = styled.div`
  width: 64px;
  height: 64px;
  background: #f1f1f1
`;

const AuthorBlock = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const AuthorProfileImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 100px;
`;

const Author = styled.div``;
const DiaryInfoBlock = styled.div`
  display: flex;
  justify-content: right;
`;

const ViewCount = styled.div`

`;

const LikeCount = styled.div`
  padding: 0 10px;
`;

const CommentCount = styled.div`
  padding: 0 10px;
`;