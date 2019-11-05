import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormEditDialogComponent } from './../form-edit-dialog/form-edit-dialog.component';
import { FormEditMenuService } from './../../../services/form-edit-menu.service';
import { StringsService } from 'src/app/shared/services/strings.service';
import { MatDialog } from '@angular/material';
import * as FormTemplateAction from './../../../../shared/store/actions/formTemplate.action';
import { IAppStore, IForm } from './../../../../shared/common/interfaces';
import * as Utils from '../../../../shared/common/utils';

@Component({
  selector: 'app-form-edit-menu',
  templateUrl: './form-edit-menu.component.html',
  styleUrls: ['./form-edit-menu.component.css']
})
export class FormEditMenuComponent implements OnInit, OnDestroy {

  @Input() itemId?: string;

  itemValue: string;
  formTemplateStore: IForm;
  storeSubscription: Subscription;

  constructor(
    private formEditMenuService: FormEditMenuService,
    public str: StringsService,
    public dialog: MatDialog,
    private store: Store<IAppStore>

  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('formTemplate').subscribe(
      (store) => {
        Utils.consoleLog('(FormEditMenuComponent) FormTemplate Store: ', 'limegreen', store);
        this.formTemplateStore = store;
      }
    );
  }

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
    return this.formEditMenuService.getItemName(this.itemId, this.formTemplateStore);
  }

  getItemValue() {
    return this.formEditMenuService.getItemValue(this.itemId, this.formTemplateStore);
  }

  updateItemValue() {
    const id = this.itemId;
    const value = this.itemValue ? this.itemValue : '';
    if (this.formEditMenuService.isItemOption(id)) {
      this.store.dispatch(new FormTemplateAction.UpdateOptionItemValue({ id, value }));
    } else {
      this.store.dispatch(new FormTemplateAction.UpdateNonOptionItemValue({ id, value }));
    }
  }

  onDelete() {
    this.store.dispatch(new FormTemplateAction.RemoveOption(this.itemId));
  }

  onAddImage() {
    console.log('Add image - clicked');
  }

  onSlideChange() {
    this.store.dispatch(new FormTemplateAction.ToggleEnableItem(this.itemId));
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
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
    return this.formEditMenuService.isSliderOn(this.itemId, this.formTemplateStore);
  }

}
