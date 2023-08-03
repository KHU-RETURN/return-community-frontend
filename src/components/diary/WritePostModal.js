import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../assets/close_gray.svg";
import PostEditor from './PostEditor';
import { uploadPost } from '../../utils/axios';

const POST_IS_EMPTY = "<p><br></p>"

const WritePostModal = ({ setIsModalOpen, name}) => {
  const ref = useRef(null);
  const [title, setTitle] = useState("")

  const handleModalClose = () => {
    document.body.style.overflow = "unset";
    setIsModalOpen(false);
  };
  const handleSubmit = async () => {
    try{
      const editorlns = ref?.current?.getInstance();
      const content = editorlns.getHTML();
      const postData = `{
        "title" : ${title},
        "content" : ${content},
        "isAnonymous" : ${false},
        "eventDate" : "2023-07-30 19:36:23",
        "thumbnailIndex": ${0}, 
      }`
    if (content === POST_IS_EMPTY) {
      alert('내용을 입력해주세요');
      return
    }
    await uploadPost(postData);
  } catch (e) {
    console.log(e);
    alert('다시 시도해주세요');
    return
  }
  setIsModalOpen(false);
  }

  return (
    <>
      <ModalBackground>
        <ModalOutlay>
          <CloseIcon
            className="close-button"
            onClick={() => handleModalClose()}
          />
          <ModalHeader>
            <ProfileImg />
            <Name>{name}</Name>
          </ModalHeader>
          <ModalInner>
            글 제목
            <PostTitle value={title} placeholder="제목을 입력해주세요" onChange={(e) => {setTitle(e.currentTarget.value)}}></PostTitle>
            <PostEditor editorRef={ref}/>
          </ModalInner>
          <ModalFooter>
            <SubmitButton onClick={() => handleSubmit()}>게시물 올리기</SubmitButton>
          </ModalFooter>
        </ModalOutlay>
      </ModalBackground>
    </>
  );
};

export default WritePostModal;

const ModalBackground = styled.div`
  display: flex;
  box-sizing: border-box;
  position: fixed;
  top: 64px;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(139, 139, 139, 0.2);
  backdrop-filter: blur(15px);
  z-index: 999;
  overflow: hidden;
  transition: .5s;
`;

const ModalOutlay = styled.div`
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 764px;
  height: 80vh;
  background: #ffffff;
  border: 1px solid #fafafa;
  box-sizing: border-box;
  border-radius: 10px;
  .close-button {
    position: absolute;
    top: 33px;
    left: 712px;
    color: #8b8b8b;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  margin: 40px 45px 0px 45px;
  height: 30px;
`;

const ProfileImg = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  background: #d2d2d2;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-left: 8px;
`;

const ModalInner = styled.div`
  margin: 18px 45px 0px 45px;
`;

const PostTitle = styled.input`
  width: 670px;
  outline: none;
  border: none;
  background: #fafafa;
  font-size: 20px;
  padding: 10px;
  border-radius: 10px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 56px 0px 45px 0px;
`;

const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 48px;
  background: #7054ff;
  border-radius: 30px;
  color: #ffffff;
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 16px;
  cursor: pointer;
`;
