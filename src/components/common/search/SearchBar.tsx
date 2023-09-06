import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';

import { getRelatedKeywords } from '@/apis/searchService';
import { RelatedKeyword } from '@/apis/searchTypes';
import { RelatedKeywordList } from '@/components/common/search';
import { useDebounce } from '@/hooks';

const SearchBar = () => {
  const [inputText, setInputText] = useState('');
  const [relatedKeywords, setRelatedKeywords] = useState<RelatedKeyword[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const selectKeyword = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    if (event.nativeEvent.isComposing) return;

    event.preventDefault();
    if (event.key === 'ArrowUp' && selectedIndex >= 0) {
      setSelectedIndex((prev) => prev - 1);
    }
    if (event.key === 'ArrowDown' && selectedIndex < relatedKeywords.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
  };

  const resetSearch = () => {
    setRelatedKeywords([]);
    setSelectedIndex(-1);
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
          onChange={(e) => {
            setInputText(e.target.value);
            searchRelatedKeywords(e.target.value);
            if (e.target.value.length === 0) {
              resetSearch();
            }
          }}
          onKeyDown={selectKeyword}
        />
        <SearchButton>검색</SearchButton>
      </SearchInput>
      {inputText.length > 0 && (
        <RelatedKeywordList keywords={relatedKeywords} selectedIndex={selectedIndex} />
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
