import React from 'react'
import styled from 'styled-components'
import { ReactComponent as DirectionIcon } from "../../assets/Triangle.svg";

const RecommentCountIndicator = ({comment, extendingCommentId, onClick}) => {
  return (
    <>
      <Wrapper onClick={() => onClick(comment.commentId)}>  {/**  */}
        <IconContainer>
          <DirectionIcon className={extendingCommentId === comment.commentId && "open"}/>
          <RecommentCount>답글 {comment.recomments.length} 개</RecommentCount>
        </IconContainer>
      </Wrapper>      
    </>
  )
}

export default RecommentCountIndicator

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
`;

const RecommentCount = styled.div`
  text-align: center;
  padding-left: 10px;
`;


const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  .deactivate {
    fill: #8b8b8b;
  }
  .activate {
    fill: #313338;
    cursor: pointer;
  }
  .open {
    transform: rotate(180deg);
    transition: .5s;
  }
`;