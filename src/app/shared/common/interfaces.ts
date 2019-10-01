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
    communityCode: string;
}

export interface Link {
    link: string;
    routerLink: string;
    icon: string;
}

export interface MatFormField {
    type: string;
    placeholder: string;
    formControlName: string;
    value?: string;
}

export interface Auth {
    uid: string;
    displayName: string;
    ra: string;
}

export interface FormOption {
    id: string;
    value: string;
    img?: string;
}

export interface Form {
    formTitle: string;
    formDate: number;
    formQuestion: string;
    formNote: string;
    formOptions: FormOption[];
    formOptionOther: any;
    isMultipleChoice: boolean;
}
