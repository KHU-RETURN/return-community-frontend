import styled from "styled-components";

function Pagination({ postsPerPage, totalPosts, page, setPage }) {
  const pageNum = [];
  const numPage = Math.ceil(totalPosts / postsPerPage); //총 페이지 개수

  for (let i = 0; i < numPage; i++) {
    pageNum.push(i);
  }

  return pageNum.map((a, i) => {
    return (
      <PageButton
        key={i + 1}
        onClick={() => {
          setPage(i + 1);
        }}
      >
        {i + 1}
      </PageButton>
    );
  });
}

export default Pagination;

const PageButton = styled.button``;
