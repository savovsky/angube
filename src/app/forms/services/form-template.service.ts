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

  answersTypeId = 'singleChoice';
  answersTypeChanged = new Subject();
  isPreview = true;

  options: FormAnswerType[] = [
    {id: 'singleChoice', name: 'single choice'},
    {id: 'multipleChoice', name: 'multiple choice'}
  ];

  constructor() { }

  changeAnswersType(id: string) {
    this.answersTypeId = id;
    this.answersTypeChanged.next();
  }

  togglePreviewEdit() {
    this.isPreview = !this.isPreview;
  }
}
