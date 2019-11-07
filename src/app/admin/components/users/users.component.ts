import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppStore, IUser } from './../../../shared/common/interfaces';
import { DatabaseService } from '../../../shared/services/database.service';
import { StringsService } from '../../../shared/services/strings.service';
import { User } from '../../../shared/common/interfaces';
import * as UsersAction from '../../../shared/store/actions/users.action';
import * as Utils from '../../../shared/common/utils';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  // TODO Add Loader.
  isFetching: boolean;
  users: IUser[];
  storeSubscription: Subscription;

  constructor(
    private databaseService: DatabaseService,
    public str: StringsService,
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.isFetching = true;
    this.store.dispatch(new UsersAction.FetchUsersStart());
    this.storeSubscription = this.store.select('users').subscribe(
      (store) => {
        Utils.consoleLog('(UsersComponent) Users Store: ', 'limegreen', store);
        this.isFetching = store.fetching;
        this.users = store.users;
      }
    );
  }

  onBlockUnblock(user: IUser) {
    const userAccount = {
      ...user,
      isBlocked: !user.isBlocked
    };
    this.databaseService.updateUserAccount(userAccount);
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
