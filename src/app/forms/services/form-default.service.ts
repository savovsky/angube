import { FormOptionModel } from './../models/form-option.model';
import { Injectable } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';
// import { IForm } from 'src/app/shared/common/interfaces';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FormDefaultService {

  constructor(
    private str: StringsService
  ) { }

  // getDefaultTemplate(): IForm {
  getDefaultTemplate() {
    return {
      id: uuid(),
      title: {
        id: this.str.titleId,
        value: this.str.formTitle,
        isEnable: true
      },
      date: Date.now(),
      question: {
        id: this.str.questionId,
        value: this.str.formQuestion,
        isEnable: true
      },
      note: {
        id: this.str.noteId,
        value: this.str.formNote,
        img: '',
        isEnable: true
      },
      options: [
        new FormOptionModel(),
        new FormOptionModel()
      ],
      optionOther: {
        id: this.str.optionOtherId,
        value: '',
        isEnable: true
      },
      isMultipleChoice: false
    };
  }

}
