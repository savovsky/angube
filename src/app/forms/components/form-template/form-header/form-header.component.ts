import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { StringsService } from 'src/app/shared/services/strings.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { IFormItem, IAppStore } from './../../../../shared/common/interfaces';
import * as Utils from '../../../../shared/common/utils';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.css']
})
export class FormHeaderComponent implements OnInit, OnDestroy {

  isEditMode: boolean;
  title: IFormItem;
  currentUserName: string;
  createdDate: number;
  currentUserUpdateSubscription: Subscription;
  storeSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    public str: StringsService,
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    // TODO Wire up with 'currentUser' store.
    this.getCurrentUserName();
    this.currentUserUpdateSubscription = this.usersService.currentUserUpdated.subscribe(
      () => { this.getCurrentUserName(); }
    );

    // -------------
    this.storeSubscription = this.store.select('formTemplate').subscribe(
      (store) => {
        Utils.consoleLog('(FormHeaderComponent) FormTemplate Store: ', 'limegreen', store);
        this.isEditMode = !store.isPreviewMode;
        this.title = store.title;
        this.createdDate = store.date;
      }
    );
  }

  getCurrentUserName() {
    this.currentUserName = this.usersService.currentUserAccount.userName;
  }

  ngOnDestroy() {
    this.currentUserUpdateSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }

}
