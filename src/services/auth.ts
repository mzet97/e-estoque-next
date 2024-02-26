import { jwtDecode } from 'jwt-decode';
import UserLogin from '@/models/auth/UserLogin';
import { api } from './apiClient';
import Token from '@/models/auth/Token';
import UserRegister from '@/models/auth/UserRegister';

type signInResult = {
    token?: Token | undefined;
    decoded?: any | undefined;
    error: string;
};

async function signIn({ email, password }: UserLogin): Promise<signInResult> {
    try {
        const response = await api.post('auth/login', {
            email,
            password,
        });

        const data = response.data;
        const token: Token = { ...data };
        const decoded = jwtDecode(token.accessToken);
        api.defaults.headers['Authorization'] = `Bearer ${token.accessToken}`;

        return {
            token,
            decoded,
            error: '',
        };
    } catch (err) {
        console.log(err);
        return {
            token: undefined,
            decoded: undefined,
            error: 'Error on login. Please try again.',
        };
    }
}

async function signUp(userDto: UserRegister): Promise<signInResult> {
    const response = await api.post('auth/register', userDto);

    const token: Token = response.data;

    if (!!token) {
        api.defaults.headers['Authorization'] = `Bearer ${token.accessToken}`;
        return {
            token,
            decoded: jwtDecode(token.accessToken),
            error: '',
        };
    }

    return {
        token: undefined,
        decoded: undefined,
        error: 'Error on login. Please try again.',
    };
}

export { signIn, signUp };
