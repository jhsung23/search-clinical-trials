import { SuggestedKeywordType } from '@/apis/searchTypes';
import { Keyword, NoKeyword } from '@/components/common/search';

interface Props {
  suggestedKeywords: SuggestedKeywordType[];
  selectedKeywordIndex: number;
}

const SuggestedKeywordList = ({ suggestedKeywords, selectedKeywordIndex }: Props) => {
  return (
    <ul>
      {suggestedKeywords.length > 0 ? (
        suggestedKeywords.map((suggestedKeyword, idx) => (
          <Keyword
            key={suggestedKeyword.sickCd}
            suggestedKeyword={suggestedKeyword}
            selected={selectedKeywordIndex === idx}
          />
        ))
      ) : (
        <NoKeyword />
      )}
    </ul>
  );
};

export default SuggestedKeywordList;
