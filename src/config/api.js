import config from './configEnviroment';

const BASE_URL = config.API_URL;

export const apiGet = async (endpoint, headers = null, timeout = 5000) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers,
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

        // console.log(response)
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const apiPost = async (
    endpoint,
    data,
    headers = {},
    timeout = 5000
) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        if (!("Content-Type" in headers)) {
            headers["Content-Type"] = 'application/json';
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: headers,
            body: data instanceof FormData ? data : JSON.stringify(data),
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
        // console.log(error);
        throw error;
    }
};
