import { IFormOption } from './../../../../shared/common/interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormTemplateService } from './../../../services/form-template.service';
import { StringsService } from 'src/app/shared/services/strings.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent implements OnInit, OnDestroy {

  formQuestion: IFormOption;
  formNote: IFormOption;
  formTemplateChangeSubscription: Subscription;

  constructor(
    private formTemplateService: FormTemplateService,
    public str: StringsService
  ) { }

  ngOnInit() {
    this.getFormQuestion();
    this.getFormNote();
    this.formTemplateChangeSubscription = this.formTemplateService.formTemplateChanged.subscribe(
      () => {
        this.getFormQuestion();
        this.getFormNote();
      }
    );
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

  ngOnDestroy() {
    this.formTemplateChangeSubscription.unsubscribe();
  }

}
