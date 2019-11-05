import { Action } from '@ngrx/store';

export const TOGGLE_PREVIEW_EDIT = '[Form Template] TOGGLE_PREVIEW_EDIT';
export const SET_TO_DEFAULT = '[Form Template] SET_TO_DEFAULT';
export const SET_IS_MULTIPLE_CHOICE = '[Form Template] SET_IS_MULTIPLE_CHOICE';
export const ADD_FORM_OPTION = '[Form Template] ADD_FORM_OPTION';
export const REMOVE_OPTION = '[Form Template] REMOVE_OPTION';
export const TOGGLE_ENABLE_ITEM = '[Form Template] TOGGLE_ENABLE_ITEM';
export const UPDATE_NON_OPTION_ITEM_VALUE = '[Form Template] UPDATE_NON_OPTION_ITEM_VALUE';
export const UPDATE_OPTION_ITEM_VALUE = '[Form Template] UPDATE_OPTION_ITEM_VALUE';


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


export type FormTemplateActions =
    | TogglePreviewEdit
    | SetToDefault
    | SetIsMultipleChoice
    | AddFormOption
    | RemoveOption
    | ToggleEnableItem
    | UpdateNonOptionItemValue
    | UpdateOptionItemValue;
