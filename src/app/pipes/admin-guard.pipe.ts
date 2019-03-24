import { Pipe, PipeTransform } from '@angular/core';
import { Link } from '../interfaces/interfaces';
import { StringService } from '../service/strings.service';


@Pipe({
    name: 'adminGuard'
    // pure: true / false  // REMIND - learn
    // https://angular.io/guide/pipes
})
export class AdminGuardPipe implements PipeTransform {

    private adminLinks = [this.str.users];

    constructor(private str: StringService) { }

    // transform(value: any, args?: any) { // REMIND - original
    transform(appLinks: Link[], isAdmin: boolean) {
        if (!appLinks) {
           return null;
        }
        // Passing all items(nav-links) only if user is an Admin.
        // If user is NOT Admin - passing only items which are NOT included in adminLinks array.
        return appLinks.filter((tab) => isAdmin ? tab.link : this.adminLinks.indexOf(tab.link) === -1);
    }
}
