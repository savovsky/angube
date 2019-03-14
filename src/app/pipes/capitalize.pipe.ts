import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

    transform(str: string) {
        if (!str) {
           return null;
        }
        // Capitalize the first letter of a string (sentence).
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
