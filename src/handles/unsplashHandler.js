import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

export const handleFetchRandomImage = async () => {
  try {
    const response = await unsplash.photos.getRandom({
      count: 1,
      query: 'stationery',
      orientation: 'landscape',
    });
    return response.response[0].urls.regular;
  } catch (err) {
    console.log(err);
  }
};
