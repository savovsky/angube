import { Component, OnInit } from '@angular/core';
import { FormTemplateService } from './../../../services/form-template.service';
import { StringsService } from 'src/app/shared/services/strings.service';



@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent implements OnInit {

  formQuestion: string;
  formNote: string;

  constructor(
    private formTemplateService: FormTemplateService,
    public str: StringsService
  ) { }

  ngOnInit() {
    this.getFormQuestion();
    this.getFormNote();
  }

  getFormQuestion() {
    this.formQuestion = this.formTemplateService.formTemplate.formQuestion;
  }

  getFormNote() {
    this.formNote = this.formTemplateService.formTemplate.formNote;
  }

  isEditMode() {
    return !this.formTemplateService.isPreview;
  }

}
