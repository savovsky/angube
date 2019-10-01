import { Injectable } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';

@Injectable({
  providedIn: 'root'
})
export class FormEditMenuService {

  itemsDeleteBtnDisabled: string[];

  constructor(
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
}
