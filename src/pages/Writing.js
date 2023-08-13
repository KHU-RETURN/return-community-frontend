import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      <CKEditor
        editor={ClassicEditor}
        data={""}
        config={{ placeholder: "글을 입력하세요" }}
      />
      <style jsx="true">
        {`
          .ck-editor__editable {
            min-height: 350px;
          }
        `}
      </style>
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
    </WritingBox>
  );
}

const WritingBox = styled.div`
  margin: auto;
  width: 80%;
`;
