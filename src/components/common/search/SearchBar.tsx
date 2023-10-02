import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';

import { getRelatedKeywords } from '@/apis/searchService';
import { RelatedKeywordType } from '@/apis/searchTypes';
import { RelatedKeywords } from '@/components/common/search';
import { useDebounce, useArrowKeyIndexNavigation } from '@/hooks';

const SearchBar = () => {
  const [inputText, setInputText] = useState('');
  const [relatedKeywords, setRelatedKeywords] = useState<RelatedKeywordType[]>([]);
  const [selectedKeywordIndex, changeSelectedKeywordIndex, resetSelectedKeywordIndex] =
    useArrowKeyIndexNavigation(relatedKeywords.length - 1);

  const resetSearch = () => {
    setRelatedKeywords([]);
    resetSelectedKeywordIndex();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    searchRelatedKeywords(e.target.value);
    if (e.target.value.length === 0) {
      resetSearch();
    }
  };

  const searchRelatedKeywords = useDebounce(async (targetKeyword: string) => {
    if (targetKeyword.length === 0) return;
    try {
      const response = await getRelatedKeywords(targetKeyword);
      setRelatedKeywords(response.data);
    } catch (e) {
      console.error(e);
    }
  }, 300);

  return (
    <Container>
      <SearchInput>
        <SearchIcon />
        <Input
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={changeSelectedKeywordIndex}
        />
        <SearchButton>검색</SearchButton>
      </SearchInput>
      {inputText.length > 0 && (
        <RelatedKeywords
          relatedKeywords={relatedKeywords}
          selectedKeywordIndex={selectedKeywordIndex}
        />
      )}
    </Container>
  );
};

const Container = styled.section``;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: white;
  border-radius: 36px;
  height: 64px;
  width: 560px;
`;

const SearchIcon = styled(BiSearch)`
  width: 20px;
  height: 20px;
  padding: 1.1rem;
`;

const Input = styled.input`
  border: 0;
  flex-grow: 1;
  outline: 0;
  height: 100%;
  font-size: 1.1rem;
  padding: 0 1.1rem 0 0;
`;

const SearchButton = styled.button`
  background-color: #357ae1;
  border: 0;
  color: white;
  height: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0 30px;
  cursor: pointer;
`;

export default SearchBar;
