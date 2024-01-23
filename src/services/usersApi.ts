import axiosInstance from '../api/instanceApi';
import { UserResponseData, UsersListResponse } from '~/api/users.types';

const fetchUsersList = async (page = 1) => {
  const res = await axiosInstance.request<UsersListResponse>({
    url: '/users',
    params: { page },
  });

  return res.data;
};

const fetchUser = async (id: string) => {
  const res = await axiosInstance.request<UserResponseData>({
    url: `/users`,
    params: { id },
  });

  return res.data;
};

const usersApi = { fetchUsersList, fetchUser };
export default usersApi;
