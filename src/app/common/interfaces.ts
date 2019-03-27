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

export interface UserLink {
    link: string;
    routerLink: string;
    queryParams: string;
    matIcon: string;
}

export interface MatFormField {
    placeholder: string;
    formControlName: string;
}

export interface Auth {
    uid: string;
    displayName: string;
    ra: string;
}
