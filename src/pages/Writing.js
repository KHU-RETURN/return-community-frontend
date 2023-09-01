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
      <h1>게시물 작성</h1>
      <ToastEditor setContent={setContent} />
    </WritingBox>
  );
}

const WritingBox = styled.div`
  margin: auto;
  width: 80%;
`;
