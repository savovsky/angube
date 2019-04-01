import { Component } from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public usersService: UsersService) { }

}
