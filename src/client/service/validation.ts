import { UserSignUpError, UserLogInError, UserData } from './user';

export type UserValidationError = 'NO_USER' | 'NO_PASSWORD';

export class UserValidationService {

    public validate(userData: UserData): UserValidationError[] {
        userData = this.sanitize(userData);
        const errors: UserValidationError[] = [];
        if (userData.userName.length === 0) {
            errors.push('NO_USER');
        }
        if (userData.password.length === 0) {
            errors.push('NO_PASSWORD');
        }
        return errors;
    }

    public sanitize(userData: UserData): UserData {
        return {
            userName: userData.userName.trim(),
            password: userData.password.trim(),
        };
    }

    public mapUserValidationErrors(errors: UserValidationError[]): string[] {
        const missingFields = errors.map((e) => {
            switch (e) {
                case 'NO_USER': return 'user';
                case 'NO_PASSWORD': return 'password';
            }
        });
        let error = missingFields.join(' and ');
        if (error) {
            error = error[0].toUpperCase() + error.slice(1);
        }
        return [error + ' required'];
    }


    public mapSignUpErrors(errors: UserSignUpError[]): string[] {
        return errors.map((e) => {
            switch (e) {
                case 'USER_EXISTING': return 'User already exists';
            }
        });
    }

    public mapLogInErrors(errors: UserLogInError[]): string[] {
        return errors.map((e) => {
            switch (e) {
                case 'USER_NOT_FOUND': return 'User was not found';
                case 'WRONG_PASSWORD': return 'Wrong password';
            }
        });
    }

}
