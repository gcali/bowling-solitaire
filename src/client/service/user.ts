import axios, { AxiosError } from 'axios';
import { store, UserState } from '@client/utils/store';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { configuration } from '@client/contants';
import { AxiosErrorHandler } from './axios';
import { UserLogInError, UserSignUpError } from '@common/codes/auth';

export interface UserData {
    userName: string;
    password: string;
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export class UserService {
    private readonly axiosHandler: AxiosErrorHandler;
    constructor() {
        this.axiosHandler = new AxiosErrorHandler();
    }

    public async logIn(userData: UserData): Promise<UserLogInError[]> {
        userData = this.sanitize(userData);
        try {
            const response = await axios.post(configuration.endpoints.login, {
                username: userData.userName,
                password: userData.password,
            });
            const { password, ...hiddenPassword } = { ...userData };
            store.setUserData(hiddenPassword);
            return [];
        } catch (e) {
            if (this.axiosHandler.isAxiosError(e)) {
                if (this.axiosHandler.isNetworkError(e)) {
                    return ['NETWORK_ERROR'];
                } else if (e.response && e.response.data.code) {
                    return [e.response.data.code];
                } else if (this.axiosHandler.isAuthenticationError(e)) {
                    return ['USER_NOT_FOUND'];
                }
            }
            throw e;
        }
    }

    public async signUp(userData: UserData): Promise<UserSignUpError[]> {
        userData = this.sanitize(userData);
        try {
            const response = await axios.post(configuration.endpoints.signUp, userData);
            const { password, ...hiddenPassword } = { ...userData };
            store.setUserData(hiddenPassword);
            return [];
        } catch (e) {
            if (this.axiosHandler.isAxiosError(e)) {
                if (this.axiosHandler.isNetworkError(e)) {
                    return ['NETWORK_ERROR'];
                } else if (e.response && e.response.data.code) {
                    return [e.response.data.code];
                } else if (this.axiosHandler.isBadRequest) {
                    return ['USER_EXISTING'];
                }
            }
            throw e;
        }
    }
    public async logOut() {
        store.setUserData({ userName: '' });
    }

    public sanitize(userData: UserData): UserData {
        return {
            userName: userData.userName.trim(),
            password: userData.password.trim(),
        };
    }

    private async getAccessToken(userData: UserData): Promise<string> {
        const response = await axios.post(configuration.endpoints.login, {
            username: userData.userName,
            password: userData.password,
        });
        return response.data as string;
    }
}

