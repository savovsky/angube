import { RouterReducerState } from '@ngrx/router-store';

export interface SignError { // REMOVE
    code: string;
    message: string;
}

export interface IAuthentErr {
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

export interface DialogData {
    header: string;
    value: string;
}

export interface Auth {
    uid: string;
    displayName: string;
    ra: string;
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

export interface IFormItem {
    id: string;
    img?: string;
    isEnable: boolean;
    value: string;
}

export interface IForm {
    isPreview: boolean;
    date: number;
    id: string;
    isMultipleChoice: boolean;
    note: IFormItem;
    optionOther: IFormItem;
    options: IFormItem[];
    question: IFormItem;
    title: IFormItem;
}

export interface IDashboardItem {
    author: string;
    id: string;
    img: string;
    publishedDate: number;
    title: string;
}

export interface IDashboard {
    forms: IDashboardItem[];
    notes: IDashboardItem[];
}

// Store
export interface IAppStore {
    router: RouterReducerState;
    authent: IAuthentStore;
    dashboard: IDashboardStore;
    currentUser: any; // TODO Do not use any!
    formTemplate: IForm;
}

export interface IAuthentStore {
    signing: boolean;
    signingUp: boolean;
    authentFulfilled: boolean;
    authentRejected: boolean;
    authentErr: string;
    fetchingToken: boolean;
    fetchTokenFulfilled: boolean;
    fetchTokenRejected: boolean;
    fetchTokenErr: string;
    loggingOut: boolean;
    logOutFulfilled: boolean;
    logOutRejected: boolean;
    logOutErr: string;
    verifyingAuthent: boolean;
    verifyAuthentFulfilled: boolean;
    verifyAuthentRejected: boolean;
    verifyAuthentErr: string;
    uid: string;
    token: string;
    email: string; // TODO Do I need it here ?
}

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
