import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../service/data-storage.service';
import * as Utils from '../common/utils';
// import { ActivatedRoute } from '@angular/router';
// import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: {}[];


  constructor(
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.dataStorageService.getItems()
    .subscribe(
      (respose) => {
        Utils.consoleLog(`getItems Seccess: `, 'purple', respose);
        this.users = respose;
      },
      (error) => Utils.consoleLog(`getItems Error: `, 'red', error),
      () => Utils.consoleLog(`getItems Completed`, 'purple')
    );
    // combineLatest([
    //   this.route.paramMap,
    //   this.route.queryParamMap
    // ])
    //   .subscribe((combined) => {
    //     this.userId = combined[0].get('id');
    //     this.page = combined[1].get('page');
    //   });

    // Another way for cases when component will be destroyed.
    // this.page = this.route.snapshot.queryParamMap.get('page');
  }

}
