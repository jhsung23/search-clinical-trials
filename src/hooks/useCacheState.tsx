import { useState } from 'react';

interface CacheValue<T> {
  expireTime: number;
  value: T;
}

const useCacheState = <T,>(expireSeconds: number) => {
  const [cache, setCache] = useState<Map<string, CacheValue<T>>>(new Map());

  const set = (key: string, value: T) => {
    setCache(
      (prevCache) =>
        new Map([...prevCache, [key, { expireTime: Date.now() + expireSeconds, value }]])
    );
  };

  const get = (key: string) => {
    const cachedData = cache.get(key);
    if (cachedData && cachedData?.expireTime > Date.now()) return cachedData?.value;
    return undefined;
  };

  const remove = (key: string) => {
    setCache((prevCache) => {
      const newCache = new Map(prevCache);
      newCache.delete(key);
      return newCache;
    });
  };

  const clear = () => {
    setCache(new Map());
  };

  return [get, set, remove, clear] as const;
};

export default useCacheState;
