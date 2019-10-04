import { User } from 'src/app/shared/common/interfaces';
import { FormTemplateService } from './../../forms/services/form-template.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { IForm } from '../common/interfaces';
import * as Utils from '../common/utils';

@Injectable({
  providedIn: 'root'
})
export class DatabaseFormsService {

  token: string;
  user: User;
  form: IForm;
  updateFormSuccess = new Subject();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private usersService: UsersService,
    private formTemplateService: FormTemplateService
  ) {
    this.token = this.authService.token;
    this.user = this.usersService.currentUser;
    this.form = this.formTemplateService.formTemplate;
  }

  updateForm() {
    this.http.put(this.updateFormUrl(), this.form)
      .subscribe(
        (response) => {
          Utils.consoleLog(`(DatabaseFormService) Update Form  - Response: `, 'darkGoldenRod', response);
          // this.usersService.updateCurrentUser(response);
          this.updateFormSuccess.next();
        },
        (error) => Utils.consoleLog(`(DatabaseFormService) Update Form - Error: `, 'red', error)
      );
  }

  updateFormUrl() {
    // TODO Use Cloud function - Custom Claims - to add Community (Group) Code for each user
    return Utils.firebaseUrl() + this.user.communityCode + '/forms/' + this.user.uid + '/' + this.form.id + '/form.json?auth=' + this.token;
  }

}

