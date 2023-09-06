import { BiSearch } from 'react-icons/bi';
import styled, { css } from 'styled-components';

interface Props {
  keywords: string[];
  selectedIndex: number;
}

const RelatedKeywords = ({ keywords, selectedIndex }: Props) => {
  return (
    <Container>
      <Span>추천 검색어</Span>
      <Ul>
        {keywords.length > 0 ? (
          keywords.map((keyword, idx) => (
            <Keyword key={idx} keyword={keyword} selected={selectedIndex === idx} />
          ))
        ) : (
          <NoKeyword />
        )}
      </Ul>
    </Container>
  );
};

const Keyword = ({ keyword, selected }: { keyword: string; selected: boolean }) => {
  return (
    <StyledLi selected={selected}>
      <SearchIcon />
      {keyword}
    </StyledLi>
  );
};

const NoKeyword = () => {
  return <Li>검색어 없음</Li>;
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 560px;
  margin-top: 10px;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
`;

const Ul = styled.ul``;

const SearchIcon = styled(BiSearch)`
  width: 20px;
  height: 20px;
`;

const Span = styled.span`
  color: #8e8e8e;
  font-size: small;
  padding: 1.2rem 1.2rem 0.4rem 1.2rem;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  font-size: medium;
`;

const StyledLi = styled(Li)<{ selected: boolean }>`
  gap: 0.6rem;

  ${({ selected }) =>
    selected
      ? css`
          background-color: #eee;
        `
      : css`
          background-color: white;
        `}
`;

export default RelatedKeywords;
