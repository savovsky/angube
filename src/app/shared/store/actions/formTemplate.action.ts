import { Action } from '@ngrx/store';

export const TOGGLE_PREVIEW_EDIT = '[Form Template] TOGGLE_PREVIEW_EDIT';
export const SET_TO_DEFAULT = '[Form Template] SET_TO_DEFAULT';
export const SET_IS_MULTIPLE_CHOICE = '[Form Template] SET_IS_MULTIPLE_CHOICE';
export const ADD_FORM_OPTION = '[Form Template] ADD_FORM_OPTION';
export const REMOVE_FORM_OPTION = '[Form Template] REMOVE_FORM_OPTION';
export const TOGGLE_ENABLE_FORM_ITEM = '[Form Template] TOGGLE_ENABLE_FORM_ITEM';


export class TogglePreviewEdit implements Action {
    readonly type = TOGGLE_PREVIEW_EDIT;
}

export class SetToDefault implements Action {
    readonly type = SET_TO_DEFAULT;
}

export class SetIsMultipleChoice implements Action {
    readonly type = SET_IS_MULTIPLE_CHOICE;
}

export class AddFormOption implements Action {
    readonly type = ADD_FORM_OPTION;
}

export class RemoveFormOption implements Action {
    readonly type = REMOVE_FORM_OPTION;

    constructor(public payload: string) { } // payload = form option id
}

export class ToggleEnableFormItem implements Action {
    readonly type = TOGGLE_ENABLE_FORM_ITEM;

    constructor(public payload: string) { } // payload = form item id
}


export type FormTemplateActions =
    | TogglePreviewEdit
    | SetToDefault
    | SetIsMultipleChoice
    | AddFormOption
    | RemoveFormOption
    | ToggleEnableFormItem;
