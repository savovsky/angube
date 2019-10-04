import { Component, OnInit } from '@angular/core';
import { DatabaseDashboardService } from './../../../../shared/services/database-dashboard.service';
import { DatabaseFormsService } from './../../../../shared/services/database-forms.service';
import { FormTemplateService } from './../../../services/form-template.service';
import { StringsService } from 'src/app/shared/services/strings.service';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.css']
})
export class FormFooterComponent implements OnInit {

  previewEditBtn: string;

  constructor(
    private formTemplateService: FormTemplateService,
    private databaseFormsService: DatabaseFormsService,
    private databaseDashboardService: DatabaseDashboardService,
    public str: StringsService
  ) { }

  ngOnInit() {
    this.previewEditBtn = this.formTemplateService.isPreview ? this.str.edit : this.str.preview;
  }

  onSave() {
    this.databaseFormsService.updateForm();
    this.formTemplateService.setToDefault();
  }

  onSaveAndPublish() {
    this.databaseFormsService.updateForm();
    this.databaseDashboardService.updateDashboardForm();
    this.formTemplateService.setToDefault();
  }

  onPreviewEdit() {
    this.formTemplateService.togglePreviewEdit();
    this.previewEditBtn = this.formTemplateService.isPreview ? this.str.edit : this.str.preview;
  }

  onCancel() {
    this.formTemplateService.setToDefault();
  }

  get isEditMode() {
    return !this.formTemplateService.isPreview;
  }

}
