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
    public usersService: UsersService,
    public str: StringsService
  ) { }

}
