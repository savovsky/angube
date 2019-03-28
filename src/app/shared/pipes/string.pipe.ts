import { Pipe, PipeTransform } from '@angular/core';
import { StringsService } from '../services/strings.service';


@Pipe({
    name: 'string'
})
export class StringPipe implements PipeTransform {

    constructor(private str: StringsService) { }

    transform(key: string) {
        if (!key) {
           return null;
        }
        return this.str[key];
    }
}

@Pipe({
    name: 'empty'
})
export class EmptyPipe implements PipeTransform {

    transform(str: string) {
        if (str === undefined || str === null) {
           return null;
        }
        if (str === '') {
           return '--';
        }
        return str;
    }
}
