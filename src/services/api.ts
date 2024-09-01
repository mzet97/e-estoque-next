import axios, { AxiosError } from 'axios';
let isRefreshing = false;
let failedRequestsQueue: {
    onSuccess: (token: string) => void;
    onFailure: (err: AxiosError<unknown, any>) => void;
}[] = [];

export function setupAPIClient(ctx = undefined) {
    //console.log('session', session);
    const api = axios.create({
        baseURL: 'http://127.0.0.1:5000/api/',
    });

    return api;
}
