import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IUser, IAppStore } from './../../../shared/common/interfaces';
import * as UsersAction from './../../../shared/store/actions/users.action';
import * as Utils from '../../../shared/common/utils';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // TODO Add Loader for fetching users and local loaders when requesting.
  isFetchingUsers: boolean;
  users: IUser[];
  storeSubscription: Subscription;

  constructor(
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.isFetchingUsers = true;
    this.store.dispatch(new UsersAction.FetchUsersStart());
    this.storeSubscription = this.store.select(appState => appState).subscribe(
      (store) => {
        Utils.consoleLog('(HomeComponent) Store: ', 'limegreen', store);
        this.isFetchingUsers = store.users.fetching;
        this.users = store.users.users;
      }
    );
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
