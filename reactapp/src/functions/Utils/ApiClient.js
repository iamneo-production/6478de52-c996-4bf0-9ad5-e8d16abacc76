import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'jwt';

export const ApiClient = axios.create({
    baseURL: 'https://' + window.location.hostname.replace('8081', '8080')
});

export function doUrlEncodedRequest(method, params, url) {
    const data = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&');
    
    return {
        method,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data,
        url
    }
}

export function setAuthorizationHeader(jwt) {
    AsyncStorage.setItem(storageKey, jwt);
    ApiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export function resetAuthorizationHeader() {
    AsyncStorage.setItem(storageKey);
    ApiClient.defaults.headers.common['Authorization'] = null;
}

export function loadAuthorizationHeaderFromStorage() {
    const jwt = AsyncStorage.getItem(storageKey);
    if (jwt) {
        ApiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
}