import { Component } from '@angular/core';
import { StringService } from '../service/strings.service';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  constructor(
    public usersService: UsersService,
    public str: StringService
  ) { }

}
