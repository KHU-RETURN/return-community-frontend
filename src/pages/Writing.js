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
  const data = useLocation();
  const lastId = data.state.id == undefined ? data.state : data.state.id;
  const navigate = useNavigate();
  const [content, setContent] = useState(" ");
  const saveWriting = async () => {
    await axios.post("http://localhost:3001");
  };

  useEffect(() => {
    if (data.state.content != undefined) {
      setContent(data.state.content);
    }
  });

  return (
    <WritingBox>
      <Title>Writing</Title>
      <ToastEditor lastId={lastId} content={content} setContent={setContent} />
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
