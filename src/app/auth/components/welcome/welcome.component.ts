import { Component } from '@angular/core';
import { StringsService } from '../../../shared/services/strings.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(public str: StringsService) { }
}
