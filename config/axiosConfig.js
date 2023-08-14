const axios = require('axios');

const apiUrl = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: process.env.API_TIMEOUT,
});

module.exports = axiosInstance;