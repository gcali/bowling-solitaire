export interface UserState {
    userName: string;
    // password: string;
}
interface State {
    userData?: UserState;
}

class Store {

    public get state(): State {
        return this._state;
    }

    private readonly _state: State = {
        userData: {
            userName: '',
            // password: '',
        },
    };
    constructor(public debug: boolean) {

    }

    public setUserData(userData: UserState) {
        this.log('setUserData', userData);
        this.state.userData = { ...userData };
    }

    private log(action: string, data: any) {
        if (this.debug) {
            // tslint:disable-next-line: no-console
            console.log(`${action} triggered with`, data);
        }
    }
}

export const store = new Store(true);
