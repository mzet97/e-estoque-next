import axios, { AxiosError } from 'axios';
let isRefreshing = false;
let failedRequestsQueue: {
    onSuccess: (token: string) => void;
    onFailure: (err: AxiosError<unknown, any>) => void;
}[] = [];

export function setupAPIClient(ctx = undefined) {
    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    return api;
}
