import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToastEditor from "../components/writingEditor";
import { Viewer } from "@toast-ui/react-editor";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&display=swap');
</style>;

export default function Writing() {
  //const lastId = useLocation();
  //const list = useLocation();
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(" ");
  const [title, setTitle] = useState("");
  const data = useLocation();
  const navigate = useNavigate();
  const lastId = edit == false ? data.state : data.state.id;

  //수정인지, 처음쓰는 글인지 확인
  const checkEdit = () => {
    if (data.state.id != undefined) {
      setEdit(true);
      console.log(edit);
    }
    if (edit == true) {
      setContent(data.state.content);
      setTitle(data.state.title);
    }
  };

  useEffect(() => {
    checkEdit();
  });

  return (
    <WritingBox>
      <Title>Writing</Title>
      {edit == true ? (
        title && (
          <ToastEditor
            createdDate={data.state.createdDate}
            id={data.state.id}
            title={title}
            setTitle={setTitle}
            edit={edit}
            lastId={lastId}
            content={content}
            setContent={setContent}
          />
        )
      ) : (
        <ToastEditor
          title={title}
          setTitle={setTitle}
          edit={edit}
          lastId={lastId}
          content={content}
          setContent={setContent}
        />
      )}
    </WritingBox>
  );
}

const WritingBox = styled.div`
  margin: auto;
  width: 80%;
`;

const Title = styled.h1`
  display: relative;
  font-family: "IBM Plex Sans KR", sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
  width: inherit;
  height: 55px;
  line-height: 1.5;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 20px;
  padding-bottom: 1rem;
  text-align: center;
  color: black;

  &::after {
    display: block;
    position: relative;
    top: 10px;
    left: 0;
    margin-left: -30px;
    bottom: 0;
    width: 60px;
    height: 2px;
    content: "";
    left: 50%;
    background-color: #739cbf;
  }
`;
