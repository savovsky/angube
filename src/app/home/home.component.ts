import { Component, OnInit } from '@angular/core';
import { UsersAccountService } from '../service/users-account.service';
import { DataStorageService } from '../service/data-storage.service';
import * as Utils from '../common/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: {}[];

  constructor(
    private usersAccountService: UsersAccountService,
    private dataStorageService: DataStorageService
    ) { }

  ngOnInit() {
    this.dataStorageService.getItems()
    .subscribe(
      (res) => {
        Utils.consoleLog(`getItems Seccess: `, 'purple', res);
        this.users = res;
        this.usersAccountService.storeUsers(res);
      },
      (error) => Utils.consoleLog(`getItems Error: `, 'red', error),
      () => Utils.consoleLog(`getItems Completed`, 'purple')
    );
  }

}
