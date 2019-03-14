import { Component } from '@angular/core';
import { StringService } from '../service/strings.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(public str: StringService) { }
}
