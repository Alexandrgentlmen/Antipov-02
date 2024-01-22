import axiosInstance from '../api/instanceApi';

const login = async (email, password) => {
  return axiosInstance.post('/login', { email, password });
};

const registration = async (name, email, password) => {
  return axiosInstance.post('/register', { name, email, password });
};

const logout = async () => {
  return axiosInstance.post('/logout');
};
const authApi = { login, registration, logout };
export default authApi;
