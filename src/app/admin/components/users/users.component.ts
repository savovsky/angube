import { Component } from '@angular/core';
import { DatabaseService } from '../../../shared/services/database.service';
import { UsersService } from '../../../shared/services/users.service';
import { StringsService } from '../../../shared/services/strings.service';
import { User } from '../../../shared/common/interfaces';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(
    private databaseService: DatabaseService,
    public usersService: UsersService,
    public str: StringsService
  ) { }

  onBlockUnblock(user: User) {
    const userAccount: User = {
      ...user,
      isBlocked: !user.isBlocked
    };
    this.databaseService.updateUserAccount(userAccount);
  }

}
