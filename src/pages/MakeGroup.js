import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&display=swap');
</style>;
export default function MakeGroup() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [groupExplain, setGroupExplain] = useState("");
  const changeGroupName = (e) => {
    setGroupName(e.target.value);
    console.log(groupName);
  };
  const changeGroupExplain = (e) => {
    setGroupExplain(e.target.value);
    console.log(groupExplain);
  };
  const postGroup = (id) => {
    axios
      .post("http://localhost:3001/group", {
        id: 3,
        name: groupName,
        member: ["민수민"],
        explain: groupExplain,
      })
      .then(() => {
        alert("등록에 성공했습니다");
        navigate("/");
      })
      .catch(() => {
        alert("등록에 실패했습니다");
      });
  };
  return (
    <div>
      <Title>Make Group</Title>
      <div>
        <h3>분류</h3>
        <label>
          <input type="radio" checked />
          스터디
        </label>
        <label>
          <input type="radio" />
          프로젝트
        </label>
        <label>
          <input type="radio" />
          기타
        </label>
        <h3>그룹 이름</h3>
        <input
          type="text"
          placeholder="이름을 적어주세요"
          onChange={changeGroupName}
        ></input>
        <h3>그룹 설명</h3>
        <textarea onChange={changeGroupExplain}></textarea>
        <div>
          <button
            onClick={() => {
              navigate("/board");
            }}
          >
            돌아가기
          </button>
          <button
            onClick={() => {
              postGroup();
            }}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

const Title = styled.h1`
  display: relative;
  font-family: "IBM Plex Sans KR", sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
  width: inherit;
  height: 55px;
  line-height: 1.5;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 20px;
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
