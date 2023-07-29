import React from "react";
import styled from "styled-components";

const SearchBar = ({ width, height, fontSize, placeholder, value, onChange }) => {
  return (
    <StyledSearchBar requirement={{width, height, fontSize}}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </StyledSearchBar>
  );
};

export default SearchBar;

export const StyledSearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.requirement.width && props.requirement.width};
  height: ${(props) => props.requirement.height && props.requirement.height};
  min-height: 44px;
  min-width: 375px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 100px;
  background: #fafafa;
  input {
    width: ${(props) => props.requirement.width && props.requirement.width};
    border: none;
    border-radius: 100px;
    outline: none;
    background: #fafafa;
    font-family: Pretendard;
    font-size: ${(props) => props.requirement.fontSize && props.requirement.fontSize};
    min-height: 44px;
    min-width: 375px;
    font-weight: 400;
    line-height: 44px;
  }
`;