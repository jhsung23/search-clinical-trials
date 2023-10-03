import axiosInstance from './axiosInstance';
import { SuggestedKeywordType } from './searchTypes';

const END_POINT = 'sick';

export const getSearchSuggestions = async (targetKeyword: string) => {
  console.info('calling api');
  const response = await axiosInstance.get<SuggestedKeywordType[]>(END_POINT, {
    params: { q: targetKeyword },
  });
  return response.data;
};
