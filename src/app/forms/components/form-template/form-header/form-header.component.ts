import { Component, OnInit, OnDestroy } from '@angular/core';
import { IFormItem } from './../../../../shared/common/interfaces';
import { FormTemplateService } from './../../../services/form-template.service';
import { StringsService } from 'src/app/shared/services/strings.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.css']
})
export class FormHeaderComponent implements OnInit, OnDestroy {

  formTitle: IFormItem;
  currentUserName: string;
  createdDate: number;
  currentUserUpdateSubscription: Subscription;
  formTemplateChangeSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    private formTemplateService: FormTemplateService,
    public str: StringsService
  ) { }

  ngOnInit() {
    this.getFormTitle();
    this.getCurrentUserName();
    this.getFormDate();
    this.currentUserUpdateSubscription = this.usersService.currentUserUpdated.subscribe(
      () => { this.getCurrentUserName(); }
    );
    this.formTemplateChangeSubscription = this.formTemplateService.formTemplateChanged.subscribe(
      () => { this.getFormTitle(); }
    );
  }

  getFormTitle() {
    this.formTitle = this.formTemplateService.formTemplate.title;
  }

  getCurrentUserName() {
    this.currentUserName = this.usersService.currentUserAccount.userName;
  }

  getFormDate() {
    this.createdDate = this.formTemplateService.formTemplate.date;
  }

  isEditMode() {
    return !this.formTemplateService.isPreview;
  }

  ngOnDestroy() {
    this.currentUserUpdateSubscription.unsubscribe();
    this.formTemplateChangeSubscription.unsubscribe();
  }

}
