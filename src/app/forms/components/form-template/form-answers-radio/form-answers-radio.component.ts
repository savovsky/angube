import { FormTemplateService } from './../../../services/form-template.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-form-answers-radio',
  templateUrl: './form-answers-radio.component.html',
  styleUrls: ['./form-answers-radio.component.css']
})
export class FormAnswersRadioComponent {

  answers = ['option 1', 'option 2'];
  yourAnswer: string;

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  isEditMode() {
    return !this.formTemplateService.isPreview;
  }

}
