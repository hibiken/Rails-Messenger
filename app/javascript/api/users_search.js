import axios from '../initializers/axios';

export const searchUsers = (query) => {
  return axios.get(`/users/search?q=${query}`)
    .then(({ data }) => {
      const users = data.data.map(u => ({ ...u.attributes, id: u.id }));
      return users;
    });
};
