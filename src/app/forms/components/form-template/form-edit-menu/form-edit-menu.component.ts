import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { StringsService } from 'src/app/shared/services/strings.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-form-edit-menu',
  templateUrl: './form-edit-menu.component.html',
  styleUrls: ['./form-edit-menu.component.css']
})
export class FormEditMenuComponent implements OnInit {

  constructor(
    public usersService: UsersService,
    public authService: AuthService,
    public str: StringsService
  ) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logOut();
  }

}
