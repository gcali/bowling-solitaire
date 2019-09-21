import { AxiosError } from 'axios';

export class AxiosErrorHandler {

    public isAxiosError(e: Error): e is AxiosError {
        return (e as AxiosError).isAxiosError;
    }

    public isNetworkError(e: AxiosError) {
        return !e.response || !e.response.status;
    }

    public isBadRequest(e: AxiosError) {
        return e.response && e.response.status === 400;
    }

    public isAuthenticationError(e: AxiosError) {
        return e.response && e.response.status === 401;
    }

    public isAuthorizationError(e: AxiosError) {
        return e.response && e.response.status === 403;
    }

    public isNotFoundError(e: AxiosError) {
        return e.response && e.response.status === 404;
    }

}
