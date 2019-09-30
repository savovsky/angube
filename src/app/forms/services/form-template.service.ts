import { Form } from './../../shared/common/interfaces';
import { FormDefaultService } from './form-default.service';
import { Injectable } from '@angular/core';
import { FormAnswerType } from 'src/app/shared/common/interfaces';
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
  answersTypeId = 'singleChoice';
  answersTypeChanged = new Subject();
  formTemplate: Form;

  options: FormAnswerType[] = [
    {id: 'singleChoice', name: 'single choice'},
    {id: 'multipleChoice', name: 'multiple choice'}
  ];

  constructor(
    private formDefaultService: FormDefaultService
  ) {
    this.formTemplate = this.formDefaultService.getDefaultTemplate();
  }

  changeAnswersType(id: string) {
    this.answersTypeId = id;
    this.answersTypeChanged.next();
  }

  togglePreviewEdit() {
    this.isPreview = !this.isPreview;
  }

  setToDefault() {
    this.isPreview = true;
    this.answersTypeId = 'singleChoice';
  }
}
