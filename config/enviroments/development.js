import * as Network from 'expo-network';

async function getMyIp() {
    try {
        const ip = await Network.getIpAddressAsync();
        console.log(ip)
        return ip;
    } catch (error) {
        return "localhost";
    }
}

export default {
    API_URL: 'http://192.168.1.83:3000/apl-back-front/v1',
    API_TIMEOUT: 5000
};