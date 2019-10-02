import { Component, Input } from '@angular/core';
import { FormEditDialogComponent } from './../form-edit-dialog/form-edit-dialog.component';
import { FormTemplateService } from './../../../services/form-template.service';
import { FormEditMenuService } from './../../../services/form-edit-menu.service';
import { StringsService } from 'src/app/shared/services/strings.service';
import { MatDialog } from '@angular/material';

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
    public str: StringsService,
    public dialog: MatDialog

  ) { }

  onEdit() {
    console.log(this.itemId);
    const dialogRef = this.dialog.open(FormEditDialogComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
      data: {name: 'miro', animal: 'dog'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  onDelete() {
    console.log(this.itemId);
    this.formTemplateService.removeFormOption(this.itemId);
  }

  isDeleteDisabled() {
    return this.formEditMenuService.isDeleteDisabled(this.itemId);
  }

}
