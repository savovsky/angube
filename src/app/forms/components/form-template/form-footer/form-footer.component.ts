import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { DatabaseDashboardService } from './../../../../shared/services/database-dashboard.service';
import { DatabaseFormsService } from './../../../../shared/services/database-forms.service';
import { StringsService } from 'src/app/shared/services/strings.service';
import * as FormTemplateAction from './../../../../shared/store/actions/formTemplate.action';
import { IAppStore, IFormStore } from './../../../../shared/common/interfaces';
import * as Utils from '../../../../shared/common/utils';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.css']
})
export class FormFooterComponent implements OnInit, OnDestroy {

  isEditMode: boolean;
  editPreviewBtn: string;
  formTemplateStore: IFormStore;
  storeSubscription: Subscription;

  constructor(
    private databaseFormsService: DatabaseFormsService,
    private databaseDashboardService: DatabaseDashboardService,
    public str: StringsService,
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select(appState => appState).subscribe(
      (store) => {
        Utils.consoleLog('(FormFooterComponenttt) FormTemplate Store: ', 'limegreen', store);
        this.isEditMode = !store.formTemplate.isPreviewMode;
        this.editPreviewBtn = store.formTemplate.isPreviewMode ? this.str.edit : this.str.preview;
        this.formTemplateStore = store.formTemplate;
      }
    );
  }

  onSave() {
    // this.databaseFormsService.updateForm();
    this.store.dispatch(new FormTemplateAction.UploadStart(this.getFormTemplate()));
    this.store.dispatch(new FormTemplateAction.SetToDefault());
  }

  onSaveAndPublish() {
    // this.databaseFormsService.updateForm();
    this.store.dispatch(new FormTemplateAction.UploadStart(this.getFormTemplate()));
    this.databaseDashboardService.updateDashboardForm();
    this.store.dispatch(new FormTemplateAction.SetToDefault());
  }

  onPreviewEdit() {
    this.store.dispatch(new FormTemplateAction.TogglePreviewEdit());
  }

  onCancel() {
    this.store.dispatch(new FormTemplateAction.SetToDefault());
  }

  getFormTemplate() {
    const { uploading, uploadFulfilled, uploadRejected, uploadErr, isPreviewMode,  ...formTemplate } = this.formTemplateStore;

    return formTemplate;
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
