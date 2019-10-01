import { FormTemplate } from './../models/form-template.model';
import { Injectable } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FormDefaultService {

  constructor(
    private str: StringsService
  ) { }

  getDefaultTemplate() {
    const template = new FormTemplate();

    template.formTitle = this.str.formTitle;
    template.formDate = Date.now();
    template.formQuestion = this.str.formQuestion;
    template.formNote = this.str.formNote;
    template.formOptions = [
      { id: uuid(), value: 'option 1', img: '' },
      { id: uuid(), value: 'option 2', img: '' }
    ];
    template.formOptionOther = { id: 'other', value: '' };

    console.log('default template = ', template);

    return template;
  }
}
