import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToastEditor from "../components/writingEditor";
import { Viewer } from "@toast-ui/react-editor";
import React, { useEffect, useRef, useState } from "react";

export default function Writing() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const saveWriting = async () => {
    await axios.post("http://localhost:3001");
  };

  const backToList = () => {
    navigate("/");
  };

  return (
    <WritingBox>
      <Title>Writing</Title>
      <ToastEditor setContent={setContent} />
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
