import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../service/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: {}[];

  constructor( private dataStorageService: DataStorageService ) { }

  ngOnInit() {
    this.dataStorageService.getItems()
    .subscribe(
      (res) => {
        this.users = Object.values(res);
        console.log('getItems: ', res);
        console.log('this.items = ', this.users);
      }
    );
  }

}
