import { store } from '@client/utils/store';

export interface UserData {
    userName: string;
    password: string;
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export type UserSignUpError = 'USER_EXISTING';
export type UserLogInError = 'USER_NOT_FOUND' | 'WRONG_PASSWORD';

export class UserService {
    public async logIn(userData: UserData): Promise<UserLogInError[]> {
        userData = this.sanitize(userData);
        await sleep(2000);
        store.setUserData(userData);
        return [];
    }
    public async signUp(userData: UserData): Promise<UserSignUpError[]> {
        userData = this.sanitize(userData);
        await sleep(2000);
        // store.setUserData(userData);
        return ['USER_EXISTING'];
    }
    public async logOut() {
        await sleep(2000);
        store.setUserData({ userName: '', password: '' });
    }

    public sanitize(userData: UserData): UserData {
        return {
            userName: userData.userName.trim(),
            password: userData.password.trim(),
        };
    }
}

