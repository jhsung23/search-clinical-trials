import styled from 'styled-components';

const NoKeyword = () => {
  return <Li>검색어 없음</Li>;
};

export const Li = styled.li`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  font-size: medium;
`;

export default NoKeyword;
