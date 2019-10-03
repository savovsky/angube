import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IFormItem } from './../../../../shared/common/interfaces';
import { FormEditDialogComponent } from './../form-edit-dialog/form-edit-dialog.component';
import { FormEditMenuService } from './../../../services/form-edit-menu.service';
import { StringsService } from 'src/app/shared/services/strings.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-form-edit-menu',
  templateUrl: './form-edit-menu.component.html',
  styleUrls: ['./form-edit-menu.component.css']
})
export class FormEditMenuComponent implements OnChanges {

  @Input() item?: IFormItem;

  constructor(
    private formEditMenuService: FormEditMenuService,
    public str: StringsService,
    public dialog: MatDialog

  ) { }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(this.item.id, changes);
  }

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

  onAddImage() {
    console.log('Add image - clicked');
  }

  onSlideChange() {
    return this.formEditMenuService.toggleEnableItem(this.item.id);
  }

  get isEditDisabled() {
    return this.item.id === this.str.optionOtherId;
  }

  get isDeleteDisabled() {
    return this.formEditMenuService.isDeleteDisabled(this.item.id);
  }

  get isAddImgDisabled() {
    return this.formEditMenuService.isAddImgDisabled(this.item.id);
  }

  get isSliderDisabled() {
    return this.formEditMenuService.isSliderDisabled(this.item.id);
  }

  get isSliderOn() {
    return this.item.isEnable;
  }

}
