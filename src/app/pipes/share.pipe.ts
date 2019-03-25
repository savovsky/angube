import { Pipe, PipeTransform } from '@angular/core';
import { StringService } from '../service/strings.service';


@Pipe({
    name: 'share'
})
export class SharePipe implements PipeTransform {

    constructor(private str: StringService) { }

    transform(key: string) {
        if (!key) {
           return null;
        }
        return this.str[key];
    }
}
