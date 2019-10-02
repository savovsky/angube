import { Injectable } from '@angular/core';
import { FormTemplateService } from './form-template.service';
import { StringsService } from 'src/app/shared/services/strings.service';

@Injectable({
  providedIn: 'root'
})
export class FormEditMenuService {

  itemsDeleteBtnDisabled: string[];

  constructor(
    private formTemplateService: FormTemplateService,
    private str: StringsService
  ) {
    this.itemsDeleteBtnDisabled = [
      this.str.titleId,
      this.str.questionId,
      this.str.noteId,
      this.str.otherOptionId
    ];
  }

  isDeleteDisabled(id: string) {
    return this.itemsDeleteBtnDisabled.find((el) => el === id);
  }

  removeOption(id: string) {
    this.formTemplateService.removeFormOption(id);
  }
}
