export interface LoginData {
    username: string;
    password: string;
}

export enum LoginResponse {
    SUCCESS = 'Ok.',
    FAIL = 'Fails.',
}
