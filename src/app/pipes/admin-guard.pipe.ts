import { Pipe, PipeTransform } from '@angular/core';
import { Link } from '../interfaces/interfaces';


@Pipe({
    name: 'adminGuard'
    // pure: true / false  // REMIND - learn
    // https://angular.io/guide/pipes
})
export class AdminGuardPipe implements PipeTransform {

    // transform(value: any, args?: any) { // REMIND - original
    transform(appLinks: Link[], isAdmin: boolean) {
        if (!appLinks) {
           return null;
        }
        // Passing all items(nav-links) only if user is an Admin.
        return appLinks.filter((tab) => isAdmin ? tab.link : tab.link !== 'Admin');
    }
}
