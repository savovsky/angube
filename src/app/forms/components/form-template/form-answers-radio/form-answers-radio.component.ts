import { FormOption } from './../../../../shared/common/interfaces';
import { FormTemplateService } from './../../../services/form-template.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-answers-radio',
  templateUrl: './form-answers-radio.component.html',
  styleUrls: ['./form-answers-radio.component.css']
})
export class FormAnswersRadioComponent implements OnInit {

  formOptions: FormOption[];
  formOptionOther: FormOption;
  yourAnswer: string;

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  ngOnInit() {
    this.getFormOptions();
    this.getFormOptionOther();
  }

  getFormOptions() {
    this.formOptions = this.formTemplateService.formTemplate.formOptions;
  }

  getFormOptionOther() {
    this.formOptionOther = this.formTemplateService.formTemplate.formOptionOther;
  }

  isEditMode() {
    return !this.formTemplateService.isPreview;
  }

}
