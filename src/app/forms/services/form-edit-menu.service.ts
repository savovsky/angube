import { Injectable } from '@angular/core';
import { FormTemplateService } from './form-template.service';
import { StringsService } from 'src/app/shared/services/strings.service';

@Injectable({
  providedIn: 'root'
})
export class FormEditMenuService {

  itemsExcludeOption: string[];
  itemsAddImageDisabled: string[];
  itemsSliderEnabled: string[];

  constructor(
    private formTemplateService: FormTemplateService,
    private str: StringsService
  ) {
    this.itemsExcludeOption = [
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

  isItemOption(id: string) {
    return !this.itemsExcludeOption.find((el) => el === id);
  }

  isAddImgDisabled(id: string) {
    return this.itemsAddImageDisabled.find((el) => el === id);
  }

  isSliderDisabled(id: string) {
    return !this.itemsSliderEnabled.find((el) => el === id);
  }

  isSliderOn(id: string) {
    if (!this.isSliderDisabled(id)) {
      return this.formTemplateService.formTemplate[`${id}`].isEnable;
    }

    return true;
  }

  getItemName(id: string) {
    if (!this.isItemOption(id)) {
      return this.formTemplateService.formTemplate[`${id}`].id;
    }

    return this.str.option;
  }

  getItemValue(id: string) {
    if (!this.isItemOption(id)) {
      return this.formTemplateService.formTemplate[`${id}`].value;
    }

    return this.formTemplateService.formTemplate.options.find((el) => el.id === id).value;
  }

  removeOption(id: string) {
    this.formTemplateService.removeFormOption(id);
  }

  toggleEnableItem(id: string) {
    this.formTemplateService.toggleEnableFormItem(id);
  }

}
