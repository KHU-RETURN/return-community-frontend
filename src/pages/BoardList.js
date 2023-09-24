import { useEffect, useState } from "react";
import axios from "axios";
import Posts from "../components/posts";
import Pagination from "../components/pagination";
import { Link, json, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&display=swap');
</style>;

function BoardList() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1); //현재 페이지
  const limit = 5; // posts가 보일 최대한의 갯수
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
      <Category>
        <Writing
          onClick={() => {
            moveToWriting();
          }}
        >
          글쓰기
        </Writing>
        <Group>그룹 만들기</Group>
        <Search class="search__input" type="text" placeholder="Search"></Search>
      </Category>
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
  margin-left: 15%;
  margin-right: 15%;
`;
const Title = styled.h1`
  display: relative;
  font-family: "IBM Plex Sans KR", sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
  width: inherit;
  height: 55px;
  line-height: 1.5;
  margin: 30px 0 20px 0;
  padding-bottom: 1rem;
  text-align: center;
  color: black;

  &::after {
    display: block;
    position: relative;
    top: 10px;
    left: 0;
    margin-left: -30px;
    bottom: 0;
    width: 60px;
    height: 2px;
    content: "";
    left: 50%;
    background-color: #739cbf;
  }
`;

const Category = styled.div`
  text-align: right;
`;

const Writing = styled.button`
  font-family: "IBM Plex Sans KR", sans-serif;
  float: left;
  border-radius: 30px;
  background-color: #739cbf;
  border: none;
  font-weight: 500;
  color: white;
  width: 100px;
  padding: 12px 24px;
  margin-bottom: 20px;
  font-size: 15px;
  line-height: 18px;
  &:hover {
    cursor: pointer;
  }
`;

const Search = styled.input`
  width: 20%;
  padding: 12px 24px;
  margin-bottom: 20px;
  background-color: transparent;
  transition: transform 250ms ease-in-out;
  font-size: 14px;
  line-height: 18px;

  color: #575756;
  background-color: transparent;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: 95% center;
  border-radius: 50px;
  border: 1px solid #575756;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  &::placeholder {
    color: color(#575756 a(0.8));
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  &:hover,
  &:focus {
    padding: 12px 0;
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #575756;
    border-radius: 0;
    background-position: 100% center;
  }
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
  height: 300px;
`;

const PageButton = styled.div`
  text-align: center;
`;

const Group = styled.button`
  float: left;
  font-family: "IBM Plex Sans KR", sans-serif;
  border-radius: 30px;
  background-color: #739cbf;
  border: none;
  font-weight: 500;
  color: white;
  width: 140px;
  padding: 12px 24px;
  margin-bottom: 20px;
  margin-left: 2%;
  font-size: 15px;
  line-height: 18px;
  &:hover {
    cursor: pointer;
  }
`;
