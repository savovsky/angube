import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
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
    public str: StringsService,
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select(appState => appState).subscribe(
      (store) => {
        Utils.consoleLog('(FormFooterComponenttt) Store: ', 'limegreen', store);
        this.isEditMode = !store.formTemplate.isPreviewMode;
        this.editPreviewBtn = store.formTemplate.isPreviewMode ? this.str.edit : this.str.preview;
        this.formTemplateStore = store.formTemplate;
      }
    );
  }

  onSave() {
    this.store.dispatch(new FormTemplateAction.UploadFormStart(this.formTemplateStore));
  }

  onSaveAndPublish() {
    // TODO Use one dispatch + effects with two 2 requests
    this.store.dispatch(new FormTemplateAction.UploadFormStart(this.formTemplateStore));
    this.store.dispatch(new FormTemplateAction.UploadFormToDashboardStart(this.formTemplateStore));
    this.store.dispatch(new FormTemplateAction.SetToDefault());
  }

  onPreviewEdit() {
    this.store.dispatch(new FormTemplateAction.TogglePreviewEdit());
  }

  onCancel() {
    this.store.dispatch(new FormTemplateAction.SetToDefault());
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
