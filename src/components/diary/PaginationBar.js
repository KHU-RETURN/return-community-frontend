import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const PaginationBar = ({currentPage, totalPages, setPage}) => {
  const handlePageChange = (e) => {
    const newPage = e.currentTarget.key;
    setPage(newPage);
  }
  const renderLinks = (totalPages) => {
    const links = [];
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      links.push(
        <Link to={`/diary/?page=${pageNum}`} key={pageNum} className={currentPage === pageNum && "current"}>
          {pageNum}
        </Link>
      );
    }
    return links;
  }
  return (
    <>
      <Container>
        {renderLinks(totalPages)}
      </Container>
    </>
  )
}

export default PaginationBar

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  a {
    padding: 0.5rem;
    text-decoration: none;
    color: #313338;
  }
  .current {
    font-weight: 600;
    font-size: 18px
  }
`;

