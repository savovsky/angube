import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormTemplateService } from './../../forms/services/form-template.service';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/common/interfaces';
import { IForm } from '../common/interfaces';
import { IDashboardItem } from './../common/interfaces';
import * as Utils from '../common/utils';

@Injectable({
  providedIn: 'root'
})
export class DatabaseDashboardService {

  token: string;
  user: User;
  form: IForm;
  dashboardUpdate = new Subject();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private usersService: UsersService,
    private formTemplateService: FormTemplateService
  ) {
    this.token = this.authService.token;
    this.user = this.usersService.currentUserAccount;
    this.form = this.formTemplateService.formTemplate;
  }

  updateDashboardForm() {
    this.http.put(this.updateDashboardFormUrl(), this.dashboardForm())
      .subscribe(
        (response) => {
          Utils.consoleLog(`(DatabaseDashboardService) Update DashboardForm  - Response: `, 'darkGoldenRod', response);
          // this.usersService.updateCurrentUser(response);
          this.dashboardUpdate.next();
        },
        (error) => Utils.consoleLog(`(DatabaseDashboardService) Update DashboardForm - Error: `, 'red', error)
      );
  }

  updateDashboardFormUrl() {
    // TODO Use Cloud function - Custom Claims - to add Community (Group) Code for each user
    return Utils.firebaseUrl() + this.user.communityCode + '/dashboard/forms/' + this.form.id + '.json?auth=' + this.token;
  }

  dashboardForm(): IDashboardItem {
    return {
      author: this.user.uid,
      id: this.form.id,
      img: '',
      publishedDate: this.form.date,
      title: this.form.title.value
    };
  }

  getDashboardData() {
    console.log('this.user', this.user);
    const user = this.usersService.currentUserAccount;
    console.log('user', user);
    console.log('ehoooo');


    return this.http.get(
      Utils.firebaseUrl() + this.user.communityCode + '/dashboard/.json?auth=' + this.token,
      {
        params: new HttpParams().set('print', 'pretty')
      }
      );
  }

}
