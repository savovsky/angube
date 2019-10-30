import { IDashboardStore, IDashboardItem } from './../common/interfaces';
import { User } from '../common/interfaces';


export const currentUser: User = {
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

export const dashboard: IDashboardStore = {
    fetching: false,
    fetchFulfilled: false,
    fetchRejected: false,
    fetchDashboardErr: '',
    deleting: false,
    deleteFulfilled: false,
    deletedRejected: false,
    deleteItemErr: '',
    forms: [] as IDashboardItem[],
    notes: [] as IDashboardItem[]
};

export const auth = {
    verifying: false,
    verifyFulfilled: false,
    verifyRejected: false,
    verifyAuthErr: '',
    uid: '',
    email: '',
    password: ''
};
