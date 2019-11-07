
import { StringsService } from '../services/strings.service';
import { FormOptionModel } from './../../forms/models/form-option.model';
import * as Interface from './../common/interfaces';

const str = new StringsService();

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
    email: '', // TODO Do I need it here ?
    communityId: 'ng68b'
};

export const formTemplate: Interface.IFormStore = {
    uploading: false,
    uploadFulfilled: false,
    uploadRejected: false,
    uploadErr: '',
    isPreviewMode: false,
    date: null,
    id: '',
    isMultipleChoice: false,
    note: {
        id: str.noteId,
        img: '',
        isEnable: true,
        value: str.formNote
    },
    optionOther: {
        id: str.optionOtherId,
        isEnable: true,
        value: ''
    },
    options: [
        new FormOptionModel(),
        new FormOptionModel()
    ],
    question: {
        id: str.questionId,
        isEnable: true,
        value: str.formQuestion
    },
    title: {
        id: str.titleId,
        isEnable: true,
        value: str.formTitle
    }
};

export const users: Interface.IUsersStore = {
    fetching: false,
    fetchFulfilled: false,
    fetchRejected: false,
    fetchUsersErr: '',
    users: []
};
