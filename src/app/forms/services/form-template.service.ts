import { FormDefaultService } from './form-default.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * @description
 * Menage form template.
 */
@Injectable({
  providedIn: 'root'
})
export class FormTemplateService {

  isPreview = false;
  formTemplateChanged = new Subject();
  formTemplate;

  constructor(
    private formDefaultService: FormDefaultService
  ) {
    this.formTemplate = this.formDefaultService.getDefaultTemplate();
  }

  setToDefault() {
    this.isPreview = true;
    this.formTemplate = this.formDefaultService.getDefaultTemplate();
  }

}
