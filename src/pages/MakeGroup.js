import styled from "styled-components";

export default function MakeGroup() {
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
        <input type="text" placeholder="이름을 적어주세요"></input>
        <h3>그룹 설명</h3>
        <textarea></textarea>
        <div>
          <button>돌아가기</button>
          <button>등록하기</button>
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
