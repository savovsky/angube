import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from '../common/interfaces';
import * as Utils from '../common/utils';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private url = 'https://angube-92c87.firebaseio.com/communities/';
  updateUserSuccess = new Subject();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  updateUserAccount(user: User) {
    const token = this.authService.token;
    const currentUserUid = this.authService.uid;

    // TODO Use Cloud function - Custom Claims - to add Community (Group) Code for each user
    this.http.put(this.url + user.communityCode + '/users/' + user.uid + '.json?auth=' + token, user)
      .subscribe(
        (response: User) => {
          if (response.uid === currentUserUid) {
            Utils.consoleLog(`(DatabaseService) Update current user account  - Response: `, 'darkGoldenRod', response);
            this.usersService.updateCurrentUser(response);
          } else {
            Utils.consoleLog(`(DatabaseService) Update user account  - Response: `, 'darkGoldenRod', response);
            this.usersService.updateUser(response);
          }
          this.updateUserSuccess.next();
        },
        (error) => Utils.consoleLog(`(DatabaseService) Update user account - Error: `, 'red', error)
      );
  }

  getUserData(uid: string) {
    const token = this.authService.token;

    // TODO 'ng68b/' is hard-coded - use Cloud function - Custom Claims - to add Community (Group) Code for each user
    return this.http.get(this.url + 'ng68b/users/' + uid + '.json?auth=' + token);
  }

  getAllUsersData() {
    const uid = this.authService.uid;
    const token = this.authService.token;

    // TODO 'ng68b/' is hard-coded - use Cloud function - Custom Claims - to add Community (Group) Code for each user
    return this.http.get(this.url + 'ng68b/users/' + '.json?auth=' + token)
      .pipe(
        map((data: []) => {
          // Creating an array from response object values.
          const usersArr = Object.values(data);
          // Reordering the array - current user as first item.
          const currentUserIndex = usersArr.findIndex((user: User) => user.uid === uid);
          usersArr.splice(0, 0, usersArr.splice(currentUserIndex, 1)[0]);
          return usersArr;
          }
        )
      );
  }
}
