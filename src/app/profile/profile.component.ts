import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../service/users.service';
import { User } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: [string, any][];
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location,
    public authService: AuthService
    ) { }


  ngOnInit() {
    const userUid = this.route.snapshot.queryParamMap.get('id');
    let userObj: User;
    userObj = this.usersService.getUser(userUid);
    this.user = Object.entries(userObj);
    console.log(this.user);
    this.subscription = this.usersService.usersStored // If page refresh.
      .subscribe(
        () => {
          userObj = this.usersService.getUser(userUid);
          this.user = Object.entries(userObj);
        }
      );

    // REMIND
    // this.uid = this.route.snapshot.paramMap.get('id');
    // REMIND
    // Another way for cases when component will not be destroyed.
    // (ex. Prev-Next btns inside the component)
    // this.route.paramMap
    //   .subscribe((params) => {
    //     this.uid = params.get('id');
    // });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onBack() {
    this.location.back();
  }

}
