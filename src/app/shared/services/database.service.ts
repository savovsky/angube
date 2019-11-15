import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private url = 'https://angube-92c87.firebaseio.com/communities/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUserData(uid: string) {
    const token = this.authService.token;

    return this.http.get(this.url + 'ng68b/users/' + uid + '.json?auth=' + token);
  }

}
