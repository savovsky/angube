import { Injectable } from '@angular/core';
import { StringService } from './strings.service';

@Injectable()
export class FormsService {
  hide = true;

  constructor(private str: StringService) { }

  onVisibilityClick(event: MouseEvent) {
    event.stopPropagation();
    this.hide = !this.hide;
  }

  getType(fieldType: string) {
    if (fieldType === this.str.email) {
      return 'email';
    } else if (fieldType === this.str.password) {
      return this.hide ? 'password' : 'text';
    } else {
      return 'text';
    }
  }
}
