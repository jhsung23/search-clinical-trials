import axiosInstance from './axiosInstance';
import { RelatedKeyword } from './searchTypes';

export const getRelatedKeywords = async (targetKeyword: string) => {
  console.info('calling api');
  return await axiosInstance
    .get<RelatedKeyword[]>('sick', { params: { q: targetKeyword } })
    .then((data) => data);
};
