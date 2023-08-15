import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { getCommentList } from '../utils/axios';

const DiaryDetail = () => {
  const location = useLocation();
  const { state } = location;
  const diary = state;
  const [commentList, setCommentList] = useState([]);
  const devCommentList = [
    {
      "commentId": 1,
      "content": "리턴 커뮤니티 다이어리 댓글",
      "likeCount": 3,
      "recommentCount": 1,
      "user": {
          "userId" : 1,
          "profileImgURL": "",
          "name": "김수한무",
      },
      "isLiked": true,
      "createdDate": "2023-08-13"
    },
    {
      "commentId": 2,
      "content": "리턴 커뮤니티 다이어리 댓글",
      "likeCount": 3,
      "recommentCount": 1,
      "user": {
          "userId" : 1,
          "profileImgURL": "",
          "name": "김수한무",
      },
      "isLiked": true,
      "createdDate": "2023-08-13"
    } 
];
  useEffect(() => {
    //const newComments = getCommentList(post.postId);
    //setCommentList(newComments)
  }, [diary.diaryId])
  
  return (
    <>
      diary-detail
      <PageBody>
        <DiaryHeader>
          <Title>{diary.title}</Title>
          <DateContainer>
            <DateInfo>작성 일자 : {diary.createdDate.slice(0, -7)}</DateInfo>
            <DateInfo>수정 일자 : {diary.modifiedDate.slice(0, -7)}</DateInfo>
          </DateContainer>
        </DiaryHeader>
        <DiaryBody>
          <DiaryContent>{diary.content}</DiaryContent>
        </DiaryBody>
        <DiaryCommentContainer>
          <CommentInput></CommentInput>
          <CommentsContainer>
          {!!devCommentList.length && devCommentList.map((comment) => 
          <Comment>
            <Header>
              <ProfileImg />
              <Name>{comment.user.name}</Name>
            </Header>
            <Body>
              <Content>{comment.content}</Content>
              <WriteButton>댓글작성</WriteButton>
            </Body>
          </Comment>)}
        </CommentsContainer>
        </DiaryCommentContainer>
      </PageBody>
    </>
  )
}

export default DiaryDetail

const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Pretendard;
`;

const DiaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 886px;
  border-bottom: 1px solid;
  font-size: 1.5rem;
`;

const DateContainer = styled.div``;

const DateInfo = styled.div`
  font-size: 0.8rem;
`;

const DiaryBody = styled.div`
  width: 886px;
  min-height: 400px;
  padding: 10px;
`;

const Title = styled.div`
`;

const DiaryContent = styled.div`
`;

const DiaryCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const CommentInput = styled.textarea`
  width: 886px;
  height: 100px;
  border: none;
  resize: none;
  outline: none;
  background: #f1f1f1;
  padding: 10px;
  font-family: Pretendard;
`;

const CommentsContainer = styled.div`
`;

const Comment = styled.div`
  margin-top: 34px;
  width: 886px;
`;

const Header = styled.div`
  display: flex;
  height: 16px;
  align-items: center;
`;
const ProfileImg = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 100px;
  background: #d2d2d2;
`;
const Name = styled.div`
  height: 16px;
  margin-left: 5px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  color: #313338;
`;
const Body = styled.div`
  margin: 5px 0px 0px 23px;
`;
const Content = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 21px;
`;
const WriteButton = styled(Content)`
  color: #8b8b8b;
  cursor: pointer;
`;