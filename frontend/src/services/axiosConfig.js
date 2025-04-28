import axios from 'axios';

// Create axios instance with base URL
const instance = axios.create({
    baseURL: 'https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1', // Live API URL
    timeout: 10000,
});

// Add request interceptor to add token
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized error (e.g., redirect to login)
            localStorage.removeItem('token');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

export default instance; 