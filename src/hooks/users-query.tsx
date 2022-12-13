import axios, {AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import {StackOverflowUser} from '../models/StackOverflowUser';

interface ServerResponse {
  items: StackOverflowUser[];
}

export const useGetUsersQuery = () => {
  return useQuery(
    'users',
    async () => {
      const response: AxiosResponse<ServerResponse> = await axios.get(
        'http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow',
      );
      return response.data.items;
    },
    {keepPreviousData: true},
  );
};
