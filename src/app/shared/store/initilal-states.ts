import * as Interface from './../common/interfaces';


export const currentUser: Interface.User = {
    userName: 'user name',
    firstName: 'first name',
    lastName: '',
    birthdate: '',
    email: '',
    isBlocked: false,
    isAdmin: false,
    uid: '',
    communityCode: ''
};

export const dashboard: Interface.IDashboardStore = {
    fetching: false,
    fetchFulfilled: false,
    fetchRejected: false,
    fetchDashboardErr: '',
    deleting: false,
    deleteFulfilled: false,
    deletedRejected: false,
    deleteItemErr: '',
    forms: [],
    notes: []
};

export const auth: Interface.IAuthStore = {
    verifying: false,
    verifyFulfilled: false,
    verifyRejected: false,
    verifyAuthErr: '',
    uid: '',
    email: '',
    password: '',
    token: ''
};

export const signIn: Interface.ISignInStore = {
    signing: false,
    signInFulfilled: false,
    signInRejected: false,
    signInErr: '',
    fetchingToken: false,
    fetchTokenFulfilled: false,
    fetchTokenRejected: false,
    fetchTokenErr: '',
    uid: '',
    email: '',
    password: '',
    token: ''
};
