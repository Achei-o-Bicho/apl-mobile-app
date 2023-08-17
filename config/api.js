import config from './configEnviroment';

const BASE_URL = config.API_URL;

export const apiGet = async (endpoint, timeout = 5000) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error('Erro de requisição');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const apiPost = async (endpoint, data, timeout = 5000) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error('Erro de requisição');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw error;
    }
};