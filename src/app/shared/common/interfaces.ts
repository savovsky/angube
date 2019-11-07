import { RouterReducerState } from '@ngrx/router-store';

export interface SignError { // TODO Remove when refactoring is done.
    code: string;
    message: string;
}

export interface IAuthentErr {
    code: string;
    message: string;
}

export interface User {  // TODO Remove when refactoring is done.
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

export interface IUser {
    uid: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
    isAdmin: boolean;
    isBlocked: boolean;
    phoneNumber: string;
    communityId: string;
}

export interface DialogData {
    header: string;
    value: string;
}

export interface IAuth {
    uid: string;
    displayName: string;
    ra: string; // ra = token
    email: string;
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

export interface IFormTemplate {
    date: number;
    id: string;
    isMultipleChoice: boolean;
    note: IFormItem;
    optionOther: IFormItem;
    options: IFormItem[];
    question: IFormItem;
    title: IFormItem;
}

export interface IFormStore extends IFormTemplate {
    uploading: boolean;
    uploadFulfilled: boolean;
    uploadRejected: boolean;
    uploadErr: string;
    isPreviewMode: boolean;
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
    formTemplate: IFormStore;
    users: IUsersStore;
    user: IUserStore;
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
    communityId: string;
}

export interface IUserStore {
    fetching: boolean;
    fetchFulfilled: boolean;
    fetchRejected: boolean;
    fetchUserErr: string;
    updating: boolean;
    updateFulfilled: boolean;
    updateRejected: boolean;
    updateUserErr: string;
    deleting: boolean;
    deleteFulfilled: boolean;
    deletedRejected: boolean;
    deleteUserErr: string;
    user: IUser;
}

export interface IUsersStore {
    fetching: boolean;
    fetchFulfilled: boolean;
    fetchRejected: boolean;
    fetchUsersErr: string;
    users: IUser[];
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
