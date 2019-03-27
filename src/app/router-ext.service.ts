import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterExtService {

  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;

    router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;
        }
      });
  }

  get previousPath() {
    // REMIND After refresh events are lost -> previousUrl = currentUrl !
    return this.previousUrl;
  }
  get currentPath() {
    return this.currentUrl;
  }
}
