import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable()
export class DataStorageService {

    private url = 'https://angube-92c87.firebaseio.com/items.json?auth=';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    storeItems() {
        const token = this.authService.getToken();
        const item: {}[] = [
            {id: 1, title: 'item1'},
            {id: 2, title: 'item2'}
        ];

        return this.http.put(this.url + token, item);
    }

    getItems() {
        const token = this.authService.getToken();
        return this.http.get(this.url + token);
    }
}
