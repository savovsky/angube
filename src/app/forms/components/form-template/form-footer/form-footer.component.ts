import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { DatabaseDashboardService } from './../../../../shared/services/database-dashboard.service';
import { DatabaseFormsService } from './../../../../shared/services/database-forms.service';
import { FormTemplateService } from './../../../services/form-template.service';
import { StringsService } from 'src/app/shared/services/strings.service';
import * as FormTemplateAction from './../../../../shared/store/actions/formTemplate.action';
import { IAppStore } from './../../../../shared/common/interfaces';
import * as Utils from '../../../../shared/common/utils';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.css']
})
export class FormFooterComponent implements OnInit, OnDestroy {

  isEditMode: boolean;
  editPreviewBtn: string;
  storeSubscription: Subscription;

  constructor(
    private formTemplateService: FormTemplateService,
    private databaseFormsService: DatabaseFormsService,
    private databaseDashboardService: DatabaseDashboardService,
    public str: StringsService,
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('formTemplate').subscribe(
      (store) => {
        Utils.consoleLog('(FormFooterComponent) FormTemplate Store: ', 'limegreen', store);
        this.isEditMode = !store.isPreview;
        this.editPreviewBtn = store.isPreview ? this.str.edit : this.str.preview;
      }
    );
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
    this.store.dispatch(new FormTemplateAction.TogglePreviewEdit());
  }

  onCancel() {
    this.formTemplateService.setToDefault();
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
