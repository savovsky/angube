import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/interfaces';
import * as Utils from '../common/utils';
import { DataStorageService } from '../service/data-storage.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  isFetching = true;

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router
    ) { }


  ngOnInit() {
    // this.userId = this.route.snapshot.paramMap.get('id');
    const uid = this.route.snapshot.queryParamMap.get('id');

    this.dataStorageService.getUserData(uid)
    .subscribe(
      (response: User) => {
        Utils.consoleLog(`getUserData Seccess: `, 'purple', response);
        this.authService.currentUserIsAdmin(response.isAdmin);
        this.user = response;
        this.isFetching = false;
      },
      (error) => Utils.consoleLog(`getUserData Error: `, 'red', error),
      () => Utils.consoleLog(`getUserData Completed`, 'purple')
    );

    // const userObj = this.usersService.users.find((obj: Account) => obj.uid === uid);
    // this.user = Object.entries(userObj);


    // Another way for cases when component will not be destroyed.
    // (ex. Prev-Next btns inside the component)
    // this.route.paramMap
    //   .subscribe((params) => {
    //     this.userId = params.get('id');
    // });

  }

  onBack() {
    this.router.navigate(['/app/home']);
  }

}
