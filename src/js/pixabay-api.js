import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '40715513-1d25e2f91f40f46af302a2c73';

export async function getPhotos(userInput, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: userInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
  });

  const res = await axios.get(`${URL}?${params}`);
  // console.log(res.data);
  return res.data;
}
