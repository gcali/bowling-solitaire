import { NetworkError } from './common';

export type UserSignUpError = 'USER_EXISTING' | NetworkError;
export type UserLogInError = 'USER_NOT_FOUND' | NetworkError;

export const userExisting: UserSignUpError = 'USER_EXISTING';
export const userNotFound: UserLogInError = 'USER_NOT_FOUND';
