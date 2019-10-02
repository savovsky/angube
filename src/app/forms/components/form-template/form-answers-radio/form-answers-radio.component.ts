import { IFormOption } from './../../../../shared/common/interfaces';
import { FormTemplateService } from './../../../services/form-template.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-answers-radio',
  templateUrl: './form-answers-radio.component.html',
  styleUrls: ['./form-answers-radio.component.css']
})
export class FormAnswersRadioComponent implements OnInit, OnDestroy {

  formOptions: IFormOption[];
  optionOther: IFormOption;
  formTemplateChangeSubscription: Subscription;

  yourAnswer: string;

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  ngOnInit() {
    this.getFormOptions();
    this.getFormOptionOther();
    this.formTemplateChangeSubscription = this.formTemplateService.formTemplateChanged.subscribe(
      () => {
        this.getFormOptions();
        this.getFormOptionOther();
      }
    );
  }

  getFormOptions() {
    this.formOptions = this.formTemplateService.formTemplate.formOptions;
  }

  getFormOptionOther() {
    this.optionOther = this.formTemplateService.formTemplate.formOptionOther;
  }

  isEditMode() {
    return !this.formTemplateService.isPreview;
  }

  ngOnDestroy() {
    this.formTemplateChangeSubscription.unsubscribe();
  }

}
