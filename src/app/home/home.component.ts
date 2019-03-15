import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public usersService: UsersService) { }

}
