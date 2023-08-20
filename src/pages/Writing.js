import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToastEditor from "../components/writingEditor";

export default function Writing() {
  const navigate = useNavigate();

  const saveWriting = async () => {
    await axios.post("http://localhost:3001");
  };

  const backToList = () => {
    navigate("/");
  };

  return (
    <WritingBox>
      <h1>게시물 작성</h1>
      <ToastEditor />
      <ButtonBox>
        <button
          onClick={() => {
            backToList();
          }}
        >
          등록
        </button>
        <button
          onClick={() => {
            backToList();
          }}
        >
          취소
        </button>
      </ButtonBox>
    </WritingBox>
  );
}

const WritingBox = styled.div`
  margin: auto;
  width: 80%;
`;

const ButtonBox = styled.div`
  margin-top: 20px;
`;
