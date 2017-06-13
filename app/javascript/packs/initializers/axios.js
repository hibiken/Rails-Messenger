import axios from 'axios';

const authToken = document.head.querySelector('[name="jwt-token"]').content

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Authorization': `Token ${authToken}`,
  },
});

export default instance;
