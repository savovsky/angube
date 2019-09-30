import { FormTemplate } from './../models/form-template.model';
import { Injectable } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';

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

    return template;
  }
}