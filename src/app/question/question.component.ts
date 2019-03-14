import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { StringService } from '../service/strings.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  constructor(
    public authService: AuthService,
    public str: StringService
  ) { }

}
