import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';


const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: 'https://asset-verse-server-sigma.vercel.app',
    });

    instance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    instance.interceptors.response.use(
      response => response,
      async error => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
