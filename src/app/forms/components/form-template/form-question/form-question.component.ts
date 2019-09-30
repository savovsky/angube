import { FormTemplateService } from './../../../services/form-template.service';
import { Component } from '@angular/core';



@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent {

  formQuestion = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
  'Class aptent taciti add litora?';
  formNote = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aptent taciti sociosqu add litora.' +
  'Aliquam lobortis fermentum justo car maximus. Class aptent taciti sociosqu add litora.';

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  isEditMode() {
    return !this.formTemplateService.isPreview;
  }

}
