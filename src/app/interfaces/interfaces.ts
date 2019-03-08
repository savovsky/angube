export interface SignError {
    code: string;
    message: string;
}

export interface CurrentUser {
    uid: string;
    displayName: string;
    email: string;
    // ra: string;
}

export interface User {
    uid: string;
    userName: string;
    firstName: string;
    lastName: string;
}
