import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Observable } from "rxjs";
import { combineLatest } from 'rxjs';
import { DataStorageService } from '../service/data-storage.service';


// import 'rxjs/add/observable/combineLatest';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userId: string;
  page: string;
  users = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Tom'},
    {id: 3, name: 'Ben'}
  ];

  items: any;

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
      .subscribe((combined) => {
        this.userId = combined[0].get('id');
        this.page = combined[1].get('page');
        // console.log(this.userId);
        // console.log(this.page);
      });

    // Another way for cases when component will be destroyed.
    // this.page = this.route.snapshot.queryParamMap.get('page');
    // console.log(this.page);

    this.dataStorageService.getItems()
    .subscribe(
      (response) => {
        console.log('getItems', response);
        this.items = response;
      }
    );
  }

  onSaveData() {
    this.dataStorageService.storeItems()
      .subscribe(
        (response) => {
          console.log('storeItems ', response);
        }
      );
  }

}
