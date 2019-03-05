import { Component } from '@angular/core';
import { UsersAccountService } from '../service/users-account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private usersAccountService: UsersAccountService) { }

  users: {}[] = this.usersAccountService.getUsers();

}
