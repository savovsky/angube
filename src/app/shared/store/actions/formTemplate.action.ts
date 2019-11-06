import { Action } from '@ngrx/store';
import { IFormTemplate, IFormStore } from './../../common/interfaces';

export const SET_FORM_ID = '[Form Template] SET_FORM_ID';
export const SET_FORM_DATE = '[Form Template] SET_FORM_DATE';
export const TOGGLE_PREVIEW_EDIT = '[Form Template] TOGGLE_PREVIEW_EDIT';
export const SET_TO_DEFAULT = '[Form Template] SET_TO_DEFAULT';
export const SET_IS_MULTIPLE_CHOICE = '[Form Template] SET_IS_MULTIPLE_CHOICE';
export const ADD_OPTION = '[Form Template] ADD_OPTION';
export const REMOVE_OPTION = '[Form Template] REMOVE_OPTION';
export const TOGGLE_ENABLE_ITEM = '[Form Template] TOGGLE_ENABLE_ITEM';
export const UPDATE_NON_OPTION_ITEM_VALUE = '[Form Template] UPDATE_NON_OPTION_ITEM_VALUE';
export const UPDATE_OPTION_ITEM_VALUE = '[Form Template] UPDATE_OPTION_ITEM_VALUE';
export const UPLOAD_FORM_START = '[Form Template] UPLOAD_FORM_START';
export const UPLOAD_FORM_FULFILLED = '[Form Template] UPLOAD_FORM_FULFILLED';
export const UPLOAD_FORM_REJECTED = '[Form Template] UPLOAD_FORM_REJECTED';
export const UPLOAD_FORM_TO_DASHBOARD_START = '[Form Template] UPLOAD_FORM_TO_DASHBOARD_START';
export const UPLOAD_FORM_TO_DASHBOARD_FULFILLED = '[Form Template] UPLOAD_FORM_TO_DASHBOARD_FULFILLED';
export const UPLOAD_FORM_TO_DASHBOARD_REJECTED = '[Form Template] UPLOAD_FORM_TO_DASHBOARD_REJECTED';


export class SetFormId implements Action {
    readonly type = SET_FORM_ID;
}

export class SetFormDate implements Action {
    readonly type = SET_FORM_DATE;
}

export class TogglePreviewEdit implements Action {
    readonly type = TOGGLE_PREVIEW_EDIT;
}

export class SetToDefault implements Action {
    readonly type = SET_TO_DEFAULT;
}

export class SetIsMultipleChoice implements Action {
    readonly type = SET_IS_MULTIPLE_CHOICE;
}

export class AddOption implements Action {
    readonly type = ADD_OPTION;
}

export class RemoveOption implements Action {
    readonly type = REMOVE_OPTION;

    constructor(public payload: string) { } // payload = form option id
}

export class ToggleEnableItem implements Action {
    readonly type = TOGGLE_ENABLE_ITEM;

    constructor(public payload: string) { } // payload = form item id
}

export class UpdateNonOptionItemValue implements Action {
    readonly type = UPDATE_NON_OPTION_ITEM_VALUE;

    constructor(public payload: { id: string, value: string }) { }
}

export class UpdateOptionItemValue implements Action {
    readonly type = UPDATE_OPTION_ITEM_VALUE;

    constructor(public payload: { id: string, value: string }) { }
}

export class UploadFormStart implements Action {
    readonly type = UPLOAD_FORM_START;

    constructor(public payload: IFormStore) { }
}

export class UploadFormFulfilled implements Action {
    readonly type = UPLOAD_FORM_FULFILLED;
}

export class UploadFormRejected implements Action {
    readonly type = UPLOAD_FORM_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export class UploadFormToDashboardStart implements Action {
    readonly type = UPLOAD_FORM_TO_DASHBOARD_START;

    constructor(public payload: IFormStore) { }
}

export class UploadFormToDashboardFulfilled implements Action {
    readonly type = UPLOAD_FORM_TO_DASHBOARD_FULFILLED;
}

export class UploadFormToDashboardRejected implements Action {
    readonly type = UPLOAD_FORM_TO_DASHBOARD_REJECTED;

    constructor(public payload: string) { } // payload = error message
}


export type FormTemplateActions =
    | SetFormId
    | SetFormDate
    | TogglePreviewEdit
    | SetToDefault
    | SetIsMultipleChoice
    | AddOption
    | RemoveOption
    | ToggleEnableItem
    | UpdateNonOptionItemValue
    | UpdateOptionItemValue
    | UploadFormStart
    | UploadFormFulfilled
    | UploadFormRejected
    | UploadFormToDashboardStart
    | UploadFormToDashboardFulfilled
    | UploadFormToDashboardRejected;
