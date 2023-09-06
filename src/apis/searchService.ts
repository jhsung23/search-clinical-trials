import CacheStorageAPI from './CacheStorageAPI';
import axiosInstance from './axiosInstance';
import { RelatedKeyword } from './searchTypes';

const END_POINT = 'sick';
const STALE_TIME = 5000;

const cacheStorageApi = new CacheStorageAPI('search', STALE_TIME);

export const getRelatedKeywords = async (targetKeyword: string) => {
  const cachedUrl = `${END_POINT}?q=${targetKeyword}`;
  const cachedResponse = await cacheStorageApi.get(cachedUrl);
  if (cachedResponse) {
    return cachedResponse;
  }

  console.info('calling api');
  const response = await axiosInstance.get<RelatedKeyword[]>(END_POINT, {
    params: { q: targetKeyword },
  });
  cacheStorageApi.set(`${END_POINT}?q=${targetKeyword}`, response);
  return response;
};
