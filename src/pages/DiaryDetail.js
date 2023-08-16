import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { deleteComment, editComment, getCommentList, postComment } from '../utils/axios';
import DateConverter from '../utils/DateConverter';
import { ReactComponent as SendIcon } from "../assets/paper_plane.svg";
import { ReactComponent as CloseIcon } from "../assets/close_gray.svg";


const DiaryDetail = () => {
  const location = useLocation();
  const { state } = location;
  const diary = state;
  const [commentList, setCommentList] = useState([]);
  const [commentData, setCommentData] = useState({"content" : "", "hashtagList" : []});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const INPUT_IS_EMPTY = commentData.content === ""
  const STATIC_URL = process.env.REACT_APP_API;

  useEffect(() => {
    getCommentList(diary.diaryId, setCommentList);
  }, [diary.diaryId])

  const handleInput = (e) => {
    const newData = {...commentData, "content" : `${e.currentTarget.value}`};
    setCommentData(newData);
  }

  const handleEdit = (e) => {
    const newComment = e.currentTarget.value;
    setEditedComment(newComment);
  }

  const handlePostComment = (diaryId, commentData) => {
    !INPUT_IS_EMPTY && postComment(diaryId, commentData)
  }

  const handleEditClick = (commentId, initialComment) => {
    setEditingCommentId(commentId);
    setEditedComment(initialComment);
  }

  const handleSaveClick = (diaryId, commentId) => {
    editComment(diaryId, commentId, editedComment);
  }

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
          <DiaryContent>{editingCommentId}</DiaryContent>
        </DiaryBody>
        <DiaryCommentContainer>
          <CommentInputContainer>
            <CommentInput className="input" type="text" value={commentData.content} onChange={handleInput}></CommentInput>
            <IconContainer>
              <SendIcon className={INPUT_IS_EMPTY ? "deactivate" : "activate"} onClick={()=>handlePostComment(diary.diaryId, commentData)}/>
            </IconContainer>
          </CommentInputContainer>
          <CommentsContainer>
          <CommentCount>댓글 {commentList.length}</CommentCount>
          {!!commentList.length && commentList.map((comment) => 
          <div key={comment.commentid}>
            {comment.commentId === editingCommentId ? (
              <CommentEditOutlay>
                <CommentEditInput className="input" value={editedComment} onChange={handleEdit} />
                <CloseIcon className="Icon close" width="18px" height="18px" fill="#313338" onClick={() => setEditingCommentId(null)}/>
                <SendIcon className={editedComment === "" ? "deactivate Icon" : "activate Icon"} onClick={()=>handleSaveClick(diary.diaryId, comment.commentId)}/>
              </CommentEditOutlay>
              ) : ( 
              <Comment>
                <Header>
                  <ProfileImg src={`${STATIC_URL + comment.user.profileImgURL}`}/>
                  <Name>{comment.user.name}</Name>
                  <WrittenTime>{DateConverter(comment.createdDate)}</WrittenTime>
                </Header>
                <Body>
                  <Content>{comment.content}</Content>
                  <InfoBox>
                    <RecommendCount>👍 {comment.likeCount}</RecommendCount>
                    <WriteButton>댓글작성</WriteButton>
                  </InfoBox>
                </Body>
                <EditButton onClick={() => handleEditClick(comment.commentId, comment.content)}>수정</EditButton>
                <DeleteButton onClick={() => deleteComment(diary.diaryId, comment.commentId)}>삭제</DeleteButton>
              </Comment>
            )}
          </div>
          )}
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

const CommentInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 886px;
  height: 100px;
  border: none;
  border-radius: 100px;
  background: #f1f1f1;
  padding: 50px;
  font-family: Pretendard;
  .input::-webkit-scrollbar {
    display: none;
}
`;

const CommentInput = styled.textarea`
  width: 750px;
  height: 100px;
  border: none;
  resize: none;
  outline: none;
  align-items: center;
  background: #f1f1f1;
  padding: 10px;
  font-size: 1rem;
  font-family: Pretendard;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  .deactivate {
    fill: #8b8b8b;
  }
  .activate {
    fill: #313338;
    cursor: pointer;
  }
`;

const CommentsContainer = styled.div`
`;

const CommentCount = styled.div`
  margin: 10px 0px 0px 20px;
  font-weight: bold;
  font-size: 1.2rem;
`;

const CommentEditOutlay = styled.div`
  width: 886px;
  margin: 20px 0px 50px 0px;
  border-bottom: 1px solid;
  position: relative;
  .Icon {
    position: absolute;
    right: 10px;
    bottom: -30px;
    cursor: pointer;
  }
  .close{
    right: 50px;
  }
  .deactivate {
    fill: #8b8b8b;
  }
  .activate {
    fill: #313338;
    cursor: pointer;
  }
  .input::-webkit-scrollbar {
    display: none;
}
`;

const Comment = styled.div`
  position: relative;
  margin-top: 34px;
  width: 886px;
`;

const CommentEditInput = styled.textarea`
  width: 800px;
  min-height: 20px;
  overflow-y: scroll;
  border: none;
  resize: none;
  outline: none;
  align-items: center;
  font-size: 1rem;
  font-family: Pretendard;
`;

const Header = styled.div`
  display: flex;
  height: 16px;
  align-items: center;
`;
const ProfileImg = styled.img`
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

const WrittenTime = styled.div`
  margin-left: 10px;
  font-size: 0.8rem;
  color: #8b8b8b;
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

const InfoBox = styled.div`
  display: flex;
`;

const RecommendCount = styled.div`
  margin-right: 10px;
`;

const WriteButton = styled(Content)`
  color: #8b8b8b;
  cursor: pointer;
`;

const EditButton = styled.div`
  position: absolute;
  right: 50px;
  top: 0px;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  position: absolute;
  right: 10px;
  top: 0px;
  cursor: pointer;
`;