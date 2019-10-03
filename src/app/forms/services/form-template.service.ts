import { IForm, IFormItem } from './../../shared/common/interfaces';
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
  formTemplate: IForm;

  constructor(
    private formDefaultService: FormDefaultService
  ) {
    this.formTemplate = this.formDefaultService.getDefaultTemplate();

  }

  togglePreviewEdit() {
    this.isPreview = !this.isPreview;
  }

  setToDefault() {
    this.isPreview = true;
    this.formTemplate = this.formDefaultService.getDefaultTemplate();
  }

  setIsMultipleChoice(isMultiple: boolean) {
    this.formTemplate.isMultipleChoice = isMultiple;
    this.formTemplateChanged.next();
  }

  addFormOption(newOption: IFormItem) {
    this.formTemplate.options.push(newOption);
    this.formTemplateChanged.next();
  }

  removeFormOption(otionId: string) {
    this.formTemplate.options = this.formTemplate.options.filter((el) => el.id !== otionId);
    this.formTemplateChanged.next();
  }

  toggleEnableFormItem(itemId: string) {
    this.formTemplate[`${itemId}`].isEnable = !this.formTemplate[`${itemId}`].isEnable;
    this.formTemplateChanged.next();
  }

}
