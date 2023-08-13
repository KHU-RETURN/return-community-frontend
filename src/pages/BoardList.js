import { useEffect, useState } from "react";
import axios from "axios";
import Posts from "../components/posts";
import Pagination from "../components/pagination";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&family=Nanum+Gothic&display=swap');
</style>;

function BoardList() {
  const navigate = useNavigate();
  let [list, setList] = useState([]);
  const [page, setPage] = useState(1); //현재 페이지
  const limit = 10; // posts가 보일 최대한의 갯수
  const offset = (page - 1) * limit; // 시작점과 끝점을 구하는 offset

  const moveToWriting = () => {
    navigate("/writing");
  };

  const postsData = (posts) => {
    if (posts) {
      let postResult = posts.slice(offset, offset + limit);
      return postResult;
    }
  };

  function getBoardList() {
    axios
      .get("http://localhost:3001/list")
      .then((res) => {
        const result = [...res.data];
        console.log(result);
        setList(result.reverse());
      })
      .catch(() => {
        console.log("get list error");
      });
  }

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <Body>
      <Title>Return Study</Title>
      <button
        onClick={() => {
          moveToWriting();
        }}
      >
        작성하기
      </button>
      <List>
        <thead>
          <tr>
            <Post>글번호</Post>
            <PostTitle>제목</PostTitle>
            <Post>작성자</Post>
            <Post>등록일</Post>
          </tr>
        </thead>
        <tbody>
          <Posts info={postsData(list)} />
        </tbody>
      </List>
      <Pagination
        postsPerPage={limit}
        page={page}
        setPage={setPage}
        totalPosts={list.length}
      />
    </Body>
  );
}

export default BoardList;

const Body = styled.div`
  font-family: "Nanum Gothic", sans-serif;
  margin-left: 100px;
`;
const Title = styled.h1`
  width: inherit;
  height: 85px;
  padding-left: 20px;
  line-height: 85px;
  margin: 0;
  text-align: left;
  color: black;
`;

const List = styled.table`
  height: 400px;
  text-align: center;
`;

const Post = styled.th`
  width: 120px;
`;

const PostTitle = styled.th`
  width: 300px;
`;
