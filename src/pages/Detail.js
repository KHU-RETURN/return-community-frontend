import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";

function Detail() {
  const id = useParams();
  const contents = useLocation();
  let list = contents.state.list;
  const userId = contents.state.userId;
  const [editButton, setEditButton] = useState(false);

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
      <h3>{list.title}</h3>
      <div>{list.user.name}</div>
      <div>{list.content}</div>
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
