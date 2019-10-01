import { Form } from './../../shared/common/interfaces';
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

  isPreview = true;
  formTemplateChanged = new Subject();
  formTemplate: Form;

  constructor(
    private formDefaultService: FormDefaultService
  ) {
    this.formTemplate = this.formDefaultService.getDefaultTemplate();
  }

  setIsMultipleChoice(isMultiple: boolean) {
    this.formTemplate.isMultipleChoice = isMultiple;
    this.formTemplateChanged.next();
  }

  togglePreviewEdit() {
    this.isPreview = !this.isPreview;
  }

  setToDefault() {
    this.isPreview = true;
    this.formTemplate = this.formDefaultService.getDefaultTemplate();
  }

}
