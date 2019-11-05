import { Injectable } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';
import { IForm } from './../../shared/common/interfaces';


@Injectable({
  providedIn: 'root'
})
export class FormEditMenuService {

  itemsExcludeOption: string[];
  itemsAddImageDisabled: string[];
  itemsSliderEnabled: string[];

  constructor(
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

  isSliderOn(id: string, store: IForm) {
    if (!this.isSliderDisabled(id)) {
      return store[`${id}`].isEnable;
    }

    return true;
  }

  getItemName(id: string, store: IForm) {
    if (!this.isItemOption(id)) {
      return store[`${id}`].id;
    }

    return this.str.option;
  }

  getItemValue(id: string, store: IForm) {
    if (!this.isItemOption(id)) {
      return store[`${id}`].value;
    }

    return store.options.find((el) => el.id === id).value;
  }

}
