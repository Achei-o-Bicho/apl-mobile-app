import axios from 'axios';
import config from './configEnviroment';

const axiosConfig = axios.create({
    baseURL: config.API_URL,
    timeout: config.API_TIMEOUT,
});

export default axiosConfig;