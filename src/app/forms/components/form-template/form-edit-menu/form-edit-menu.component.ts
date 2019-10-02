import { Component, Input } from '@angular/core';
import { IFormOption } from './../../../../shared/common/interfaces';
import { FormEditDialogComponent } from './../form-edit-dialog/form-edit-dialog.component';
import { FormEditMenuService } from './../../../services/form-edit-menu.service';
import { StringsService } from 'src/app/shared/services/strings.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-form-edit-menu',
  templateUrl: './form-edit-menu.component.html',
  styleUrls: ['./form-edit-menu.component.css']
})
export class FormEditMenuComponent {

  @Input() item?: IFormOption;

  constructor(
    private formEditMenuService: FormEditMenuService,
    public str: StringsService,
    public dialog: MatDialog

  ) { }

  onEdit() {
    console.log(this.item);
    const dialogRef = this.dialog.open(FormEditDialogComponent, {
      data: {
        header: this.item.id,
        value: this.item.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.value = result;
    });
  }

  onDelete() {
    this.formEditMenuService.removeOption(this.item.id);
  }

  get isEditDisabled() {
    return this.item.id === this.str.otherOptionId;
  }

  get isDeleteDisabled() {
    return this.formEditMenuService.isDeleteDisabled(this.item.id);
  }

  // get isImgDisabled() {
  //   return this.formEditMenuService.isDeleteDisabled(this.item.id);
  // }

}
