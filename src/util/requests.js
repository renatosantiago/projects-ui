import axios from "axios";

export const BASE_URL = 'http://localhost:8080';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const requestBackend = (config) => {
    return axios({ ...config, baseURL: BASE_URL, headers });
};

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        //
        return config;
    },
    function (error) {
        //
        return Promise.reject(error);
    }
);