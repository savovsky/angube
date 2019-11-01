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

export const authent: Interface.IAuthentStore = {
    signing: false,
    signingUp: false,
    authentFulfilled: false,
    authentRejected: false,
    authentErr: '',
    fetchingToken: false,
    fetchTokenFulfilled: false,
    fetchTokenRejected: false,
    fetchTokenErr: '',
    loggingOut: false,
    logOutFulfilled: false,
    logOutRejected: false,
    logOutErr: '',
    verifyingAuthent: false,
    verifyAuthentFulfilled: false,
    verifyAuthentRejected: false,
    verifyAuthentErr: '',
    uid: '',
    token: '',
    email: ''
};
