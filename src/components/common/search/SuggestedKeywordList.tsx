import { SuggestedKeywordType } from '@/apis/searchTypes';
import { Keyword, NoKeyword } from '@/components/common/search';

interface Props {
  suggestedKeywords: SuggestedKeywordType[];
  selectedKeywordIndex: number;
}

const SuggestedKeywordList = ({ suggestedKeywords, selectedKeywordIndex }: Props) => {
  return (
    <ul>
      {suggestedKeywords.map((suggestedKeyword, idx) => (
        <Keyword
          key={suggestedKeyword.sickCd}
          suggestedKeyword={suggestedKeyword}
          selected={selectedKeywordIndex === idx}
        />
      ))}
    </ul>
  );
};

export default SuggestedKeywordList;
