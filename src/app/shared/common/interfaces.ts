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

export interface IMyAccount {
    userName: string;
    firstName: string;
    lastName: string;
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

export interface IDashboardItem {
    author: string;
    id: string;
    img: string;
    publishedDate: number;
    title: string;
}

export interface IDashboard {
    forms: {};
    notes: {};
}

export interface DialogData {
    header: string;
    value: string;
}

// TODO do not use 'any' in the interface
export interface IDashboardStore {
    fetching: boolean;
    fetchFulfilled: boolean;
    fetchRejected: boolean;
    fetchDashboardErr: string;
    deleting: boolean;
    deleteFulfilled: boolean;
    deletedRejected: boolean;
    deleteItemErr: string;
    forms: IDashboardItem[];
    notes: IDashboardItem[];
}
