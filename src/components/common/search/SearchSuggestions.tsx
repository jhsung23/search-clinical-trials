import styled from 'styled-components';

import { SuggestedKeywordType } from '@/apis/searchTypes';
import { SuggestedKeywordList } from '@/components/common/search';

interface Props {
  suggestedKeywords: SuggestedKeywordType[];
  selectedKeywordIndex: number;
}

const SearchSuggestions = ({ suggestedKeywords, selectedKeywordIndex }: Props) => {
  return (
    <Container>
      <Span>추천 검색어</Span>
      <SuggestedKeywordList
        suggestedKeywords={suggestedKeywords}
        selectedKeywordIndex={selectedKeywordIndex}
      />
    </Container>
  );
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

const Span = styled.span`
  color: #8e8e8e;
  font-size: small;
  padding: 1.2rem 1.2rem 0.4rem 1.2rem;
`;

export default SearchSuggestions;
