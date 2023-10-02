import { BiSearch } from 'react-icons/bi';
import styled, { css } from 'styled-components';

import { Li } from './NoKeyword';
import { RelatedKeywordType } from '@/apis/searchTypes';

const Keyword = ({
  relatedKeyword,
  selected,
}: {
  relatedKeyword: RelatedKeywordType;
  selected: boolean;
}) => {
  return (
    <StyledLi selected={selected}>
      <SearchIcon />
      {relatedKeyword.sickNm}
    </StyledLi>
  );
};

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

const SearchIcon = styled(BiSearch)`
  width: 20px;
  height: 20px;
`;

export default Keyword;
