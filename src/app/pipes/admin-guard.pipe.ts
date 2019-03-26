import { Pipe, PipeTransform } from '@angular/core';
import { Link } from '../interfaces/interfaces';
import { StringService } from '../service/strings.service';


@Pipe({
    name: 'adminLinkGuard'
    // pure: true / false  // REMIND - learn
    // https://angular.io/guide/pipes
})
export class AdminLinkGuardPipe implements PipeTransform {

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

@Pipe({
    name: 'adminItemGuard'
})
export class AdminItemGuardPipe implements PipeTransform {

    private adminItems = ['uid', 'isAdmin', 'isBlocked', 'email'];

    transform(items: [string, any][], isAdmin: boolean) {
        if (!items) {
           return null;
        }
        // Passing all items only if user is an Admin.
        // If user is NOT Admin - passing only items which are NOT included in adminItems array.
        console.log('items', items);
        return items.filter((item) => isAdmin ? item : this.adminItems.indexOf(item[0]) === -1);
    }
}
