import { Component } from '@angular/core';
import { DataStorageService } from '../service/data-storage.service';
import { UsersService } from '../service/users.service';
import { StringService } from '../service/strings.service';
import { User } from '../interfaces/interfaces';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(
    private dataStorageService: DataStorageService,
    public usersService: UsersService,
    public str: StringService
  ) { }

  onBlockUnblock(user: User) {
    const userAccount = {...user, isBlocked: !user.isBlocked};
    this.dataStorageService.updateUserAccount(userAccount);
  }

}
