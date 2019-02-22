import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string;

  constructor(
    private route: ActivatedRoute,
    // private router: Router
    ) { }

  ngOnInit() {
    // this.userId = this.route.snapshot.paramMap.get('id');
    this.userId = this.route.snapshot.queryParamMap.get('id');

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
