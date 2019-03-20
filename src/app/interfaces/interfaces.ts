export interface SignError {
    code: string;
    message: string;
}

export interface User {
    uid: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
    isAdmin: boolean;
    isBlocked: boolean;
}

export interface Link {
    link: string;
    routerLink: string;
}

export interface MatFormField {
    placeholder: string;
    formControlName: string;
}
