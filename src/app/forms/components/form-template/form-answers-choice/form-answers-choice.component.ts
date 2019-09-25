import { FormTemplateService } from './../../../services/form-template.service';
import { Component, OnInit } from '@angular/core';
import { FormAnswerType } from 'src/app/shared/common/interfaces';


@Component({
  selector: 'app-form-answers-choice',
  templateUrl: './form-answers-choice.component.html',
  styleUrls: ['./form-answers-choice.component.css']
})
export class FormAnswersChoiceComponent implements OnInit {

  answersTypeId: string;

  options: FormAnswerType[] = [
    {id: 'singleChoice', name: 'single choice'},
    {id: 'multipleChoice', name: 'multiple choice'}
  ];

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  ngOnInit() {
    this.answersTypeId = this.formTemplateService.answersTypeId;
  }

  onSelectionChange(answersTypeId: string) {
    this.formTemplateService.changeAnswersType(answersTypeId);
  }

}
