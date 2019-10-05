import { Action } from '@ngrx/store';

const initialState = {
    fetching: false,
    fetchedFulfilled: false,
    fetchedRejected: false,
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


export function dashboardReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'FETCH_CONFIG_START': {
            return {
                ...state,
                fetching: true,
                fetchedFulfilled: false,
                fetchedRejected: false
            };
        }

        default:
            return state;
    }
}