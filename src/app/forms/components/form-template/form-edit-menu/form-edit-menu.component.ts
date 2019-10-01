import { FormTemplateService } from './../../../services/form-template.service';
import { FormEditMenuService } from './../../../services/form-edit-menu.service';
import { Component, Input } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';

@Component({
  selector: 'app-form-edit-menu',
  templateUrl: './form-edit-menu.component.html',
  styleUrls: ['./form-edit-menu.component.css']
})
export class FormEditMenuComponent {

  @Input() itemId?: string;

  constructor(
    private formTemplateService: FormTemplateService,
    private formEditMenuService: FormEditMenuService,
    public str: StringsService
  ) { }

  onEdit() {
    console.log(this.itemId);
  }

  onDelete() {
    console.log(this.itemId);
    this.formTemplateService.removeFormOption(this.itemId);
  }

  isDeleteDisabled() {
    return this.formEditMenuService.isDeleteDisabled(this.itemId);
  }

}
