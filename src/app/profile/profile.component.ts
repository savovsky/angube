import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersAccountService } from '../service/users-account.service';
import { Account } from '../account/account.model';
import { User } from '../interfaces/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    // private router: Router
    private usersAccountService: UsersAccountService
    ) { }


  ngOnInit() {
    // this.userId = this.route.snapshot.paramMap.get('id');
    const uid = this.route.snapshot.queryParamMap.get('id');

    console.log('usersAccountService', this.usersAccountService.users);
    this.user = this.usersAccountService.users.find((obj: Account) => obj.uid === uid);

    // Another way for cases when component will not be destroyed.
    // (ex. Prev-Next btns inside the component)
    // this.route.paramMap
    //   .subscribe((params) => {
    //     this.userId = params.get('id');
    //     console.log(this.userId);
    // });

  }

  // onSubmit() {
  //   this.router.navigate(['/users'], {
  //     queryParams: { page: 1, order: 'newest' }
  //   });
  // }

}
