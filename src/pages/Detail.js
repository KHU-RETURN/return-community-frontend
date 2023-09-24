import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Detail() {
  const navigate = useNavigate();
  const id = useParams();
  const contents = useLocation();
  const list = contents.state.list;
  const userId = contents.state.userId;
  const [editButton, setEditButton] = useState(false);

  const title =
    `# ` +
    list.title +
    `
  ` +
    `#### 작성자 : ` +
    list.user.name +
    `
  `;
  const test = list.content;
  //본인 글이면 삭제, 수정 버튼 나타남
  const showEditButton = () => {
    if (userId == list.user.userId) {
      setEditButton(true);
    }
  };

  const editPost = () => {
    navigate("/writing", { state: list });
  };

  const deletePost = () => {
    axios
      .delete(`http://localhost:3001/list/` + id.id)
      .then((res) => {
        console.log(res);
        navigate("/board");
      })
      .catch(console.log("error"));
    // console.log(id.id);
    // console.log(`http://localhost:3001/list/` + id.id);
  };

  useEffect(() => {
    showEditButton();
  }, []);

  return (
    <Body>
      <Viewer initialValue={title + test} />
      {editButton == true ? (
        <div>
          {" "}
          <button
            onClick={() => {
              editPost();
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              deletePost();
            }}
          >
            삭제
          </button>{" "}
        </div>
      ) : null}
    </Body>
  );
}

export default Detail;

const Body = styled.div`
  margin: 30px 50px 0px 50px;
`;
