import axiosInstance from '../api/instanceApi';
import { UserResponse, UsersListResponse } from '~/api/users.types';

const fetchUsersList = async (page = 1) => {
  const res = await axiosInstance.request<UsersListResponse>({
    url: '/users',
    params: { page },
  });

  return res.data;
};

const fetchUser = async (id: number) => {
  const res = await axiosInstance.request<UserResponse>({
    url: `/users`,
    params: { id },
  });
  console.log(res);
  return res.data;
};

const usersApi = { fetchUsersList, fetchUser };
export default usersApi;
