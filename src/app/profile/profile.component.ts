import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponseService } from '../service/http-response.service';
import { UsersAccountService } from '../service/users-account.service';
import { Account } from '../account/account.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string;
  user: any = { uid: null, userName: null, firstName: null, lastName: null };

  constructor(
    private route: ActivatedRoute,
    // private router: Router
    private httpResponseService: HttpResponseService,
    private usersAccountService: UsersAccountService
    ) { }


  ngOnInit() {
    // this.userId = this.route.snapshot.paramMap.get('id');
    const uid = this.route.snapshot.queryParamMap.get('id');
    this.userId = uid;
    console.log('userId', this.userId);
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
