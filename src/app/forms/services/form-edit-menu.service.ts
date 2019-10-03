import { Injectable } from '@angular/core';
import { FormTemplateService } from './form-template.service';
import { StringsService } from 'src/app/shared/services/strings.service';

@Injectable({
  providedIn: 'root'
})
export class FormEditMenuService {

  itemsDeleteBtnDisabled: string[];
  itemsAddImageDisabled: string[];
  itemsSliderEnabled: string[];

  constructor(
    private formTemplateService: FormTemplateService,
    private str: StringsService
  ) {
    this.itemsDeleteBtnDisabled = [
      this.str.titleId,
      this.str.questionId,
      this.str.noteId,
      this.str.optionOtherId
    ];

    this.itemsAddImageDisabled = [
      this.str.titleId,
      this.str.questionId,
      this.str.optionOtherId
    ];

    this.itemsSliderEnabled = [
      this.str.noteId,
      this.str.optionOtherId
    ];
  }

  isDeleteDisabled(id: string) {
    return this.itemsDeleteBtnDisabled.find((el) => el === id);
  }

  isAddImgDisabled(id: string) {
    return this.itemsAddImageDisabled.find((el) => el === id);
  }

  isSliderDisabled(id: string) {
    return !this.itemsSliderEnabled.find((el) => el === id);
  }

  removeOption(id: string) {
    this.formTemplateService.removeFormOption(id);
  }

  toggleEnableItem(id: string) {
    this.formTemplateService.toggleEnableFormItem(id);
  }

}
