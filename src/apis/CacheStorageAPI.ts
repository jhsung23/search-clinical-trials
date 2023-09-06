import { AxiosResponse } from 'axios';

class CacheStorageAPI {
  #cacheName;
  #staleTime;

  constructor(cacheName: string, staleTime: number) {
    this.#cacheName = cacheName;
    this.#staleTime = staleTime;
  }

  async set(url: string, response: AxiosResponse) {
    const newHeaders = new Headers({ 'Content-Type': 'application/json' });
    newHeaders.set('cached-time', Date.now().toString());

    return await caches.open(this.#cacheName).then((cache) =>
      cache.put(
        url,
        new Response(JSON.stringify(response), {
          headers: newHeaders,
        })
      )
    );
  }

  async get(url: string) {
    const cachedResponse = await caches.open(this.#cacheName).then((cache) => cache.match(url));

    if (cachedResponse && cachedResponse.headers.get('cached-time')) {
      if (Date.now() - parseInt(cachedResponse.headers.get('cached-time')!) < this.#staleTime) {
        return await cachedResponse.json();
      }
    }
    return null;
  }

  async remove(url: string) {
    await caches.delete(url);
  }
}

export default CacheStorageAPI;
