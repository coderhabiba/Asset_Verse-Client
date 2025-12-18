import axios from 'axios';

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
  });

  axiosSecure.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Token attached:', token);
      } else {
        console.log('No token found in localStorage');
      }
      return config;
    },
    error => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    response => response,
    error => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.reject(new Error('Unauthorized, please login again.'));
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
