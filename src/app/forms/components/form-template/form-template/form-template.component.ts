import { FormTemplateService } from './../../../services/form-template.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent {

  constructor(
    public formTemplateService: FormTemplateService
  ) { }

  isEditMode() {
    return !this.formTemplateService.isPreview;
  }

}
