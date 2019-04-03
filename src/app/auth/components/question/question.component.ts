import { Component } from '@angular/core';
import { StringsService } from '../../../shared/services/strings.service';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  constructor(
    private usersService: UsersService,
    private str: StringsService
  ) { }

  get routerLink() {
    return ['/app/account', this.usersService.currentUserName];
  }

  get queryParams() {
    return { id: this.usersService.currentUserUid };
  }

  get wouldYouLikeToUpdateYourAccount() {
    return this.str.wouldYouLikeToUpdateYourAccount;
  }

  get yes() {
    return this.str.yes;
  }

  get notNow() {
    return this.str.notNow;
  }

}
