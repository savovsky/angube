import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { DataStorageService } from '../service/data-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  // userName: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    // private dataStorageService: DataStorageService
  ) { }

  userName: string = this.authService.getCurrentUserName();

  ngOnInit() {
    // this.userName = this.authService.getCurrentUserName();
    // this.dataStorageService.getCurrentUser()
    //   .subscribe(
    //     (res: { userName: string}) => {
    //         this.userName = res.userName;
    //     }
    //   );
  }

}
