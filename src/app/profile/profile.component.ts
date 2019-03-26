import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../service/users.service';
import { User } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: [string, any][];
  subscription: Subscription;
  items: any;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location
    ) { }


  ngOnInit() {
    const userUid = this.route.snapshot.queryParamMap.get('id');
    let userObj: User;
    userObj = this.usersService.getUser(userUid);
    this.user = Object.entries(userObj);
    this.subscription = this.usersService.usersStored
      .subscribe(
        () => {
          userObj = this.usersService.getUser(userUid);
          this.user = Object.entries(userObj);
        }
      );

    console.log(Object.entries(this.user));


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
