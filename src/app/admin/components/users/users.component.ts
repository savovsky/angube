import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { StringsService } from '../../../shared/services/strings.service';
import { IAppStore, IUser } from './../../../shared/common/interfaces';
import * as UsersAction from '../../../shared/store/actions/users.action';
import * as UserAction from '../../../shared/store/actions/user.action';
import * as Utils from '../../../shared/common/utils';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  // TODO Add Loader for fetching users and local loaders when requesting.
  isFetchingUsers: boolean;
  isUpdatingUser: boolean;
  users: IUser[];
  storeSubscription: Subscription;

  constructor(
    private store: Store<IAppStore>,
    public str: StringsService
  ) { }

  ngOnInit() {
    this.isFetchingUsers = true;
    this.store.dispatch(new UsersAction.FetchUsersStart());
    this.storeSubscription = this.store.select(appState => appState).subscribe(
      (store) => {
        Utils.consoleLog('(UsersComponent) Store: ', 'limegreen', store);
        this.isFetchingUsers = store.users.fetching;
        this.isUpdatingUser = store.user.updating;
        this.users = store.users.users;
      }
    );
  }

  onMessage(user: IUser) {
    console.log('Create message to user: ', user);
  }

  onBlockUnblock(user: IUser) {
    const userAccount = {
      ...user,
      isBlocked: !user.isBlocked
    };

    this.store.dispatch(new UserAction.UpdateUserStart(userAccount));
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
