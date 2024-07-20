// components/shop/Blog/FetchApi.ts
import axios from 'axios';

const API_URL = 'http://65.2.184.250/wp-json/wp/v2/posts';

export const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchPostById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
