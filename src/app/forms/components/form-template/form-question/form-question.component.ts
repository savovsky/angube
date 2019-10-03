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

  question: IFormItem;
  note: IFormItem;
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
    this.question = this.formTemplateService.formTemplate.question;
  }

  getFormNote() {
    this.note = this.formTemplateService.formTemplate.note;
  }

  isEditMode() {
    return !this.formTemplateService.isPreview;
  }

  get isDisplayAllowed() {
    if (this.note.value && this.note.isEnable) {
      return true;
    } else if (this.isEditMode()) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    this.formTemplateChangeSubscription.unsubscribe();
  }

}
