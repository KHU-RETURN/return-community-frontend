import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

function Posts({ info, userId }) {
  const navigate = useNavigate();

  return info !== undefined ? (
    info.map((list, i) => {
      const id = list.id;
      return (
        <LinkToDetail
          onClick={() => {
            navigate("/detail/" + id, {
              state: { list: { ...list }, userId: userId },
            });
          }}
          key={id}
        >
          <Post>{list.id}</Post>
          <Post>{list.title}</Post>
          <Post>{list.user.name}</Post>
          <Post>{list.createdDate}</Post>
        </LinkToDetail>
      );
    })
  ) : (
    <div>loading...</div>
  );
}

export default Posts;

const LinkToDetail = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
  }
`;

const Post = styled.td`
  height: 25px;
  padding: 5px;
`;
