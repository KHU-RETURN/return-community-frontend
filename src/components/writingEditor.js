import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useRef, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&display=swap');
</style>;

export default function TostEditor({
  createdDate,
  id,
  title,
  setTitle,
  edit,
  content,
  setContent,
  lastId,
}) {
  const editorRef = useRef();
  const navigate = useNavigate();
  const titleRef = useRef();

  //제목 가져오기
  const saveTitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  //현재 날짜 가져오기
  const getToday = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    return year + "/" + month + "/" + date;
  };

  //포스트 업로드 or 수정
  const uploadPost = (title, content) => {
    if (title == "") {
      console.log("제목이 널값");
      alert("제목을 입력해주세요");
      return false;
    }
    if (content == "") {
      alert("내용을 입력해주세요");
      console.log("내용이 널값");
      return false;
    }
    if (edit == false) {
      const date = getToday();
      axios
        .post("http://localhost:3001/list", {
          id: lastId.state + 1,
          title: title,
          content: content,
          likeCount: 0,
          commentCount: 0,
          user: {
            userId: 2020103722,
            profileImgURL: "",
            name: "민수민",
          },
          createdDate: date,
          isMyPost: true,
        })
        .then((res) => {
          alert("등록에 성공했습니다");
          navigate("/board");
        })
        .catch((error) => {
          alert("등록에 실패했습니다");
        });
    } else {
      //axios.put
      console.log("수정하는 포스트");
      axios
        .put("http://localhost:3001/list/" + id, {
          title: title,
          content: content,
          likeCount: 0,
          commentCount: 0,
          user: {
            userId: 2020103722,
            profileImgURL: "",
            name: "민수민",
          },
          createdDate: createdDate,
          isMyPost: true,
        })
        .then((res) => {
          alert("수정에 성공했습니다");
          navigate("/board");
        })
        .catch((error) => {
          alert("수정에 실패했습니다");
        });
    }
  };

  // 에디터의 내용을 가져오는 함수
  const handleGetContent = () => {
    if (editorRef.current && titleRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const content = editorInstance.getMarkdown(); // Markdown 형식의 내용을 가져옴
      const title = titleRef.current.value;
      setContent(content);
      setTitle(title);
      console.log(content);
      console.log("upload success");
      uploadPost(title, content);
    } else {
      console.log("content 에러");
    }
  };

  console.log(content);

  return (
    <div>
      <PostTitle
        type="text"
        placeholder="제목을 입력하세요"
        defaultValue={title}
        ref={titleRef}
      />
      <Editor
        ref={editorRef}
        initialValue={content}
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
              navigate("/board");
            }
          }}
        >
          취소
        </button>
        <button
          onClick={() => {
            console.log(titleRef.current.value);
          }}
        >
          제목확인
        </button>
      </ButtonBox>
    </div>
  );
}

const ButtonBox = styled.div`
  margin-top: 20px;
`;

const PostTitle = styled.input`
  font-family: "IBM Plex Sans KR", sans-serif;
  font-size: 20px;
  font-weight: 600;
  width: 99%;
  height: 40px;
  border: none;
  border-bottom: solid 1px #ababab;
  margin-bottom: 20px;
  margin-top: 20px;
`;
