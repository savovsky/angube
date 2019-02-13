import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Tom'},
    {id: 3, name: 'Ben'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
