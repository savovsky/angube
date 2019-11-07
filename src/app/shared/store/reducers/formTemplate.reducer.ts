import { v4 as uuid } from 'uuid';
import { IFormItem } from './../../common/interfaces';
import * as Action from '../actions/formTemplate.action';
import { FormOptionModel } from 'src/app/forms/models/form-option.model';
import * as InitialState from '../initilal-states';


export function formTemplateReducer(
    state = InitialState.formTemplate,
    action: Action.FormTemplateActions
    ) {

    switch (action.type) {
        case Action.SET_FORM_ID: {
            return {
                ...state,
                id: uuid()
            };
        }
        case Action.SET_FORM_DATE: {
            return {
                ...state,
                date: Date.now()
            };
        }
        case Action.TOGGLE_PREVIEW_EDIT: {
            return {
                ...state,
                isPreviewMode: !state.isPreviewMode
            };
        }
        case Action.SET_TO_DEFAULT: {
            return {
                ...InitialState.formTemplate
            };
        }
        case Action.SET_IS_MULTIPLE_CHOICE: {
            return {
                ...state,
                isMultipleChoice: !state.isMultipleChoice
            };
        }
        case Action.ADD_OPTION: {
            return {
                ...state,
                options: [...state.options, new FormOptionModel()]
            };
        }
        case Action.REMOVE_OPTION: {
            return {
                ...state,
                options: state.options.filter(
                    (item: IFormItem) => item.id !== action.payload
                )
            };
        }
        case Action.TOGGLE_ENABLE_ITEM: {
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    isEnable: !state[action.payload].isEnable
                }
            };
        }
        case Action.UPDATE_NON_OPTION_ITEM_VALUE: {
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    value: action.payload.value
                }
            };
        }
        case Action.UPDATE_OPTION_ITEM_VALUE: {
            return {
                ...state,
                options: [...state.options.map((item: IFormItem) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            value: action.payload.value
                        };
                    }
                    return item;
                })]
            };
        }
        case Action.UPLOAD_FORM_START: {
            return {
                ...state,
                uploading: true,
                uploadFulfilled: false,
                uploadRejected: false,
                uploadErr: ''
            };
        }
        case Action.UPLOAD_FORM_FULFILLED: {
            return {
                ...state,
                uploading: false,
                uploadFulfilled: true,
                uploadRejected: false
            };
        }
        case Action.UPLOAD_FORM_REJECTED: {
            return {
                ...state,
                uploading: false,
                uploadFulfilled: false,
                uploadRejected: true,
                uploadErr: action.payload
            };
        }
        // TODO UPLOAD_FORM_TO_DASHBOARD_ or merge all uploads!

        default:
            return state;
    }
}
