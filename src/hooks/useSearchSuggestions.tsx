import { useState } from 'react';

import { getSearchSuggestions } from '@/apis/searchService';
import { SuggestedKeywordType } from '@/apis/searchTypes';
import { useCacheState } from '@/hooks';

const useSearchSuggestions = () => {
  const [suggestions, setSuggestions] = useState<SuggestedKeywordType[]>([]);
  const [getCachedSuggestions, setCachedSuggestions] = useCacheState<SuggestedKeywordType[]>(
    1000 * 60 * 5
  );

  const getSuggestions = async (keyword: string) => {
    if (keyword.length === 0) {
      setSuggestions([]);
      return;
    }

    const cachedSuggestions = getCachedSuggestions(keyword);
    if (cachedSuggestions) {
      setSuggestions(cachedSuggestions);
      return;
    }

    try {
      const responseData = await getSearchSuggestions(keyword);
      setCachedSuggestions(keyword, responseData);
      setSuggestions(responseData);
    } catch (e) {
      console.error(e);
    }
    return;
  };

  return [suggestions, getSuggestions] as const;
};

export default useSearchSuggestions;
