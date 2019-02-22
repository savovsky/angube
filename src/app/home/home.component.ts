import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../service/data-storage.service';
import { UsersAccountService } from '../service/users-account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: {}[];

  constructor(
    private dataStorageService: DataStorageService,
    private usersAccountService: UsersAccountService
    ) { }

  ngOnInit() {
    this.dataStorageService.getItems()
    .subscribe(
      (res) => {
        this.users = res;
        this.usersAccountService.storeUsers(res);
        console.log('this.items = ', this.users);
      },
      (err) => console.log('getItems Error: ', err),
      () => console.log('getItems completed: ')
    );
  }

}
