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

export const dashboard = {
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
