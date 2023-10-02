import { RelatedKeywordType } from '@/apis/searchTypes';
import { Keyword, NoKeyword } from '@/components/common/search';

interface Props {
  relatedKeywords: RelatedKeywordType[];
  selectedKeywordIndex: number;
}

const RelatedKeywordList = ({ relatedKeywords, selectedKeywordIndex }: Props) => {
  return (
    <ul>
      {relatedKeywords.length > 0 ? (
        relatedKeywords.map((relatedKeyword, idx) => (
          <Keyword
            key={relatedKeyword.sickCd}
            relatedKeyword={relatedKeyword}
            selected={selectedKeywordIndex === idx}
          />
        ))
      ) : (
        <NoKeyword />
      )}
    </ul>
  );
};

export default RelatedKeywordList;
