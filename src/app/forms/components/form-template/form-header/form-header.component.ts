import { FormTemplateService } from './../../../services/form-template.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.css']
})
export class FormHeaderComponent implements OnInit, OnDestroy {

  formTitle = '';
  currentUserName: string;
  today: number = Date.now();
  currentUserUpdateSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    public formTemplateService: FormTemplateService,
    public str: StringsService
  ) { }

  ngOnInit() {
    this.setCurrentUserName();
    this.currentUserUpdateSubscription = this.usersService.currentUserUpdated.subscribe(
      () => {
        this.setCurrentUserName();
      }
    );
  }

  ngOnDestroy() {
    this.currentUserUpdateSubscription.unsubscribe();
  }

  setCurrentUserName() {
    this.currentUserName = this.usersService.currentUserAccount.userName;
  }

}
