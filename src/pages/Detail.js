import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

function Detail() {
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

  const editPost = (button) => {
    if (button == "수정") {
    } else if (button == "삭제") {
    }
  };

  useEffect(() => {
    showEditButton();
  }, []);

  return (
    <div>
      {/* <h3>{list.title}</h3>
      <div>{list.user.name}</div> */}
      <Viewer initialValue={title + test} />
      {editButton == true ? (
        <div>
          {" "}
          <button>수정</button>
          <button>삭제</button>{" "}
        </div>
      ) : null}
    </div>
  );
}

export default Detail;
