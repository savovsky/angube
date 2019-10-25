import { User } from '../common/interfaces';


export const currentUser: User = {
    userName: 'eho',
    firstName: 'beho',
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
    errMsg: '',
    forms: {
        '123456': {
            author: 'miro',
            formId: '123456',
            img: '',
            publishDate: '31/08/1977',
            title: 'Birthday',
        }
    },
    notes: {
        qwerty: {
            author: 'miro',
            noteId: 'qwerty',
            publishDate: '31/08/1977',
            title: 'Birthday',
        }
    }
};
