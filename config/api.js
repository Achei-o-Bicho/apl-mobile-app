import config from './configEnviroment';

const BASE_URL = config.API_URL;

export const apiGet = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);

        if (!response.ok) {
            throw new Error('Erro de requisição');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const apiPost = async (endpoint, data) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Erro de requisição');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
};