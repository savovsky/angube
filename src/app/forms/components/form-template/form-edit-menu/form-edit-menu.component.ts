import { Component, Input } from '@angular/core';
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

  @Input() itemId?: string;

  itemValue: string;

  constructor(
    private formEditMenuService: FormEditMenuService,
    public str: StringsService,
    public dialog: MatDialog

  ) { }

  onEdit() {
    const dialogRef = this.dialog.open(FormEditDialogComponent, {
      data: {
        header: this.getItemName(),
        value: this.getItemValue()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.itemValue = result;
      this.updateItemValue();
    });
  }

  getItemName() {
    return this.formEditMenuService.getItemName(this.itemId);
  }

  getItemValue() {
    return this.formEditMenuService.getItemValue(this.itemId);
  }

  updateItemValue() {
    const value = this.itemValue ? this.itemValue : '';
    this.formEditMenuService.updateItemValue(this.itemId, value);
  }

  onDelete() {
    this.formEditMenuService.removeOption(this.itemId);
  }

  onAddImage() {
    console.log('Add image - clicked');
  }

  onSlideChange() {
    return this.formEditMenuService.toggleEnableItem(this.itemId);
  }

  get isEditDisabled() {
    return this.itemId === this.str.optionOtherId;
  }

  get isItemOption() {
    return this.formEditMenuService.isItemOption(this.itemId);
  }

  get isAddImgDisabled() {
    return this.formEditMenuService.isAddImgDisabled(this.itemId);
  }

  get isSliderDisabled() {
    return this.formEditMenuService.isSliderDisabled(this.itemId);
  }

  get isSliderOn() {
    return this.formEditMenuService.isSliderOn(this.itemId);
  }

}
