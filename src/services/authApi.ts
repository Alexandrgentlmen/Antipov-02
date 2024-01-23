import axiosInstance from '../api/instanceApi';

const login = async (email, password) => {
  return axiosInstance.post('/login', { email, password });
};

export interface IRegPayload {
  name: string;
  email: string;
  password: string;
}

const registration = async (payload: IRegPayload) => {
  return axiosInstance.post('/register', payload);
};

const logout = async () => {
  return axiosInstance.post('/logout');
};
const authApi = { login, registration, logout };
export default authApi;
