import { IFormItem } from './../../common/interfaces';
import * as Action from '../actions/formTemplate.action';
import { FormOptionModel } from 'src/app/forms/models/form-option.model';
import * as InitialState from '../initilal-states';


export function formTemplateReducer(
    state = InitialState.formTemplate,
    action: Action.FormTemplateActions
    ) {

    switch (action.type) {
        case Action.TOGGLE_PREVIEW_EDIT: {
            return {
                ...state,
                isPreview: !state.isPreview
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
        case Action.ADD_FORM_OPTION: {
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

        default:
            return state;
    }
}
