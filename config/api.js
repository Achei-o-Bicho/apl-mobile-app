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

export const apiPost = async (
    endpoint,
    data,
    headers = {
        'Content-Type': 'application/json',
    },
    timeout = 5000
) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`
Erro de requisição
URL: ${response.url}
StatusCode: ${response.status}
ResponseBody: ${response.body}
            `);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
