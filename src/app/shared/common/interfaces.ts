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

export interface IFormOption {
    id: string;
    value: string;
    img?: string;
}

export interface IForm {
    formTitle: IFormOption;
    formDate: number;
    formQuestion: IFormOption;
    formNote: IFormOption;
    formOptions: IFormOption[];
    formOptionOther: IFormOption;
    isMultipleChoice: boolean;
}

export interface DialogData {
    header: string;
    value: string;
  }
