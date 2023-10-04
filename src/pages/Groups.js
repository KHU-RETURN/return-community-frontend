import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&display=swap');
</style>;

export default function Groups() {
  const navigate = useNavigate();
  const [group, setGroup] = useState([]);
  const getGroup = () => {
    axios.get("http://localhost:3001/group").then((res) => {
      const result = [...res.data];
      console.log(result);
      setGroup(result);
    });
  };

  useEffect(() => {
    getGroup();
  }, []);
  return (
    <div>
      <Title>Groups</Title>
      <GroupBox>
        {group.map((a, i) => {
          return (
            <Group key={i}>
              <div>{a.name}</div>
              {/* <div>{a.explain}</div> */}
            </Group>
          );
        })}
      </GroupBox>
      <PlusGroup
        onClick={() => {
          navigate("/makeGroup");
        }}
      >
        +
      </PlusGroup>
    </div>
  );
}

const Title = styled.h1`
  display: relative;
  font-family: "IBM Plex Sans KR", sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
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

const GroupBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 85%;
  margin: auto;
`;

const Group = styled.button`
  width: 31.3%;
  height: 190px;
  border-radius: 20px;
  border: none;
  &:hover {
    background-color: grey;
    cursor: pointer;
  }
  margin: 1%;
`;

const PlusGroup = styled.button`
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: none;
  width: 80px;
  height: 80px;
  font-size: 40px;
  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`;
