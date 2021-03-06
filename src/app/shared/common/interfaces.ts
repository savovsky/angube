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

export interface IFormItem {
    id: string;
    value: string;
    img?: string;
    isEnable: boolean;
}

export interface IForm {
    id: string;
    title: IFormItem;
    date: number;
    question: IFormItem;
    note: IFormItem;
    options: IFormItem[];
    optionOther: IFormItem;
    isMultipleChoice: boolean;
}

export interface IFormDashboard {
    author: string;
    id: string;
    img: string;
    publishedDate: number;
    title: string;
}

export interface DialogData {
    header: string;
    value: string;
  }
