import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';

import { RelatedKeywords } from '@/components/common/search';

const keywords = ['초콜릿', '사탕', '젤리', '쿠키', '휘낭시에', '마카롱', '냉면'];

const SearchBar = () => {
  const [inputText, setInputText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const selectKeyword = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowUp' && selectedIndex > -1) {
      event.preventDefault();
      setSelectedIndex((prev) => prev - 1);
    }
    if (event.key === 'ArrowDown' && selectedIndex < keywords.length - 1) {
      event.preventDefault();
      setSelectedIndex((prev) => prev + 1);
    }
    return;
  };

  return (
    <Container>
      <SearchInput>
        <SearchIcon />
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={selectKeyword}
        />
        <SearchButton>검색</SearchButton>
      </SearchInput>
      <RelatedKeywords keywords={keywords} selectedIndex={selectedIndex} />
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