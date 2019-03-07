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
