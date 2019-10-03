import { FormTemplateService } from './../../../services/form-template.service';
import { Component, OnInit } from '@angular/core';
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
    public str: StringsService
  ) { }

  ngOnInit() {
    this.previewEditBtn = this.formTemplateService.isPreview ? this.str.edit : this.str.preview;
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
