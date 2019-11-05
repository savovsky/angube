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

  isPreview = false;
  formTemplateChanged = new Subject();
  // formTemplate: IForm;
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

  removeFormOption(otionId: string) {
    this.formTemplate.options = this.formTemplate.options.filter((el) => el.id !== otionId);
    this.formTemplateChanged.next();
  }

  toggleEnableFormItem(itemId: string) {
    this.formTemplate[`${itemId}`].isEnable = !this.formTemplate[`${itemId}`].isEnable;
    this.formTemplateChanged.next();
  }

}
