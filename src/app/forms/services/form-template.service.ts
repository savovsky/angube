import { Injectable } from '@angular/core';
import { FormDefaultService } from './form-default.service';

// TODO Delete this file, when Store is wired up!
@Injectable({
  providedIn: 'root'
})
export class FormTemplateService {

  formTemplate;

  constructor(
    private formDefaultService: FormDefaultService
  ) {
    this.formTemplate = this.formDefaultService.getDefaultTemplate();
  }

}
