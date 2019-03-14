import { Pipe, PipeTransform } from '@angular/core';
import { Tab } from '../interfaces/interfaces';


@Pipe({
    name: 'adminGuard'
})
export class AdminGuardPipe implements PipeTransform {

    // transform(value: any, args?: any) { // original
    transform(tabs: Tab[], isAdmin: boolean) {
        if (!tabs) {
           return null;
        }
        // Passing all items(nav-links) only if user is an Admin.
        return tabs.filter((tab) => isAdmin ? tab.link : tab.link !== 'Admin');
    }
}
