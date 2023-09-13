import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useRef } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function TostEditor({ setContent }) {
  const editorRef = useRef();
  const navigate = useNavigate();

  // 에디터의 내용을 가져오는 함수
  const handleGetContent = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const content = editorInstance.getMarkdown(); // Markdown 형식의 내용을 가져옴
      setContent(content);
      console.log("success");
      alert("등록에 성공했습니다");
      navigate("/");
    } else {
      console.log("error");
      alert("등록 실패");
    }
  };

  return (
    <div>
      <Editor
        ref={editorRef}
        initialValue="# 제목을 입력해주세요"
        initialEditType="wysiwyg"
        placeholder="내용을 입력해주세요."
        previewStyle="tab"
        height="420px"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["image", "link"],
          ["code", "codeblock"],
        ]}
        plugins={[colorSyntax]}
        useCommandShortcut={false}
        language="ko-KR"
        handleGetContent={handleGetContent}
      ></Editor>

      <ButtonBox>
        <button
          onClick={() => {
            handleGetContent();
          }}
        >
          등록
        </button>
        <button
          onClick={() => {
            if (window.confirm("글이 삭제됩니다. 취소하시겠습니까?")) {
              alert("취소되었습니다");
              navigate("/");
            }
          }}
        >
          취소
        </button>
      </ButtonBox>
    </div>
  );
}

const ButtonBox = styled.div`
  margin-top: 20px;
`;
