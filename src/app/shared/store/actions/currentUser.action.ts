import { Action } from '@ngrx/store';
import { IMyAccount } from '../../common/interfaces';

export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

export class UpdateCurrentUser implements Action {

    readonly type = UPDATE_CURRENT_USER;

    constructor(public payload: IMyAccount) { }
}
