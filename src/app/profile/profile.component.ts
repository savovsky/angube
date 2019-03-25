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

  user: User;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location
    ) { }


  ngOnInit() {
    const userUid = this.route.snapshot.queryParamMap.get('id');
    this.user = this.usersService.getUser(userUid);
    this.subscription = this.usersService.usersStored
      .subscribe(
        () => this.user = this.usersService.getUser(userUid)
      );

    // REMIND
    // this.userId = this.route.snapshot.paramMap.get('id');
    // REMIND
    // Another way for cases when component will not be destroyed.
    // (ex. Prev-Next btns inside the component)
    // this.route.paramMap
    //   .subscribe((params) => {
    //     this.userId = params.get('id');
    // });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onBack() {
    this.location.back();
  }

}
