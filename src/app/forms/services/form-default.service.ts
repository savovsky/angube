import { FormOptionModel } from './../models/form-option.model';
import { Injectable } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';
import { IForm } from 'src/app/shared/common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FormDefaultService {

  constructor(
    private str: StringsService
  ) { }

  getDefaultTemplate(): IForm {
    return {
      formTitle: {
        id: this.str.titleId,
        value: this.str.formTitle
      },
      formDate: Date.now(),
      formQuestion: {
        id: this.str.questionId,
        value: this.str.formQuestion
      },
      formNote: {
        id: this.str.noteId,
        value: this.str.formNote
      },
      formOptions: [
        new FormOptionModel(),
        new FormOptionModel()
      ],
      formOptionOther: {
        id: this.str.otherOptionId,
        value: ''
      },
      isMultipleChoice: false
    };
  }

}
