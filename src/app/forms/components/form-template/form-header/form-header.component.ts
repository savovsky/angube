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

  formTitle: string;
  currentUserName: string;
  createdDate: number;
  currentUserUpdateSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    private formTemplateService: FormTemplateService,
    public str: StringsService
  ) { }

  ngOnInit() {
    this.setFormTitleToDefault();
    this.setCurrentUserName();
    this.setCreatedDate();
    this.currentUserUpdateSubscription = this.usersService.currentUserUpdated.subscribe(
      () => {
        this.setCurrentUserName();
      }
    );
  }

  setFormTitleToDefault() {
    this.formTitle = this.formTemplateService.formTemplate.formTitle;
  }

  setCurrentUserName() {
    this.currentUserName = this.usersService.currentUserAccount.userName;
  }

  setCreatedDate() {
    this.createdDate = this.formTemplateService.formTemplate.formDate;
  }

  isEditMode() {
    return !this.formTemplateService.isPreview;
  }

  ngOnDestroy() {
    this.currentUserUpdateSubscription.unsubscribe();
  }

}
