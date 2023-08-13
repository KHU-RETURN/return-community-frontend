import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

function Posts({ info }) {
  const navigate = useNavigate();

  return info !== undefined ? (
    info.map((list, i) => {
      const id = list.id;
      return (
        <LinkToDetail
          onClick={() => {
            navigate("/detail/" + id, { state: { ...list } });
          }}
          key={id}
        >
          <td>{list.id}</td>
          <td>{list.title}</td>
          <td>{list.user.name}</td>
          <td>{list.createdDate}</td>
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
`;
