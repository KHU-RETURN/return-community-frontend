import { useEffect, useState } from "react";
import axios from "axios";
import Posts from "../components/posts";
import Pagination from "../components/pagination";
import { Link, json, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&family=Nanum+Gothic&display=swap');
</style>;

function BoardList() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  const [list, setList] = useState([]);
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

  //post list 가져오기
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

  //사용자 profile 조회
  const getUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3001/profile");
      console.log(response.data[0].studentId);
      setUserId(response.data[0].studentId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
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
      <TableBox>
        <List>
          <thead>
            <PostBox>
              <Post>글번호</Post>
              <PostTitle>제목</PostTitle>
              <Post>작성자</Post>
              <Post>등록일</Post>
            </PostBox>
          </thead>
          <tbody>
            <Posts info={postsData(list)} userId={userId} />
          </tbody>
        </List>
      </TableBox>
      <PageButton>
        <Pagination
          postsPerPage={limit}
          page={page}
          setPage={setPage}
          totalPosts={list.length}
        />
      </PageButton>
    </Body>
  );
}

export default BoardList;

const Body = styled.div`
  font-family: "Nanum Gothic", sans-serif;
  margin-left: 100px;
  margin-right: 100px;
`;
const Title = styled.h1`
  width: inherit;
  height: 55px;
  padding-left: 30px;
  line-height: 1.5;
  margin: 30px 0 20px 0;
  text-align: left;
  color: white;
  border-radius: 30px;
  background-color: #b2ebf4;
`;

const List = styled.table`
  text-align: center;
  border-top: 1px solid #444444;
  border-collapse: collapse;
  width: 100%;
`;

const Post = styled.th`
  width: 120px;
  border-bottom: 1px solid #444444;
  padding: 10px;
`;

const PostTitle = styled.th`
  width: 600px;
  border-bottom: 1px solid #444444;
  padding: 10px;
`;

const PostBox = styled.tr`
  border-collapse: collapse;
  border-bottom: 1px solid #444444;
  padding: 10px;
`;

const TableBox = styled.div`
  height: 400px;
`;

const PageButton = styled.div`
  text-align: center;
`;
