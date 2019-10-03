import { IFormItem } from './../../../../shared/common/interfaces';
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

  formQuestion: IFormItem;
  formNote: IFormItem;
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
        console.log(this.formQuestion);
      }
    );
  }

  getFormQuestion() {
    this.formQuestion = this.formTemplateService.formTemplate.question;
  }

  getFormNote() {
    this.formNote = this.formTemplateService.formTemplate.note;
  }

  isEditMode() {
    return !this.formTemplateService.isPreview;
  }

  ngOnDestroy() {
    this.formTemplateChangeSubscription.unsubscribe();
  }

}
