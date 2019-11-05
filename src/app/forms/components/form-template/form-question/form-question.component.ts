import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { StringsService } from 'src/app/shared/services/strings.service';
import { IFormItem, IAppStore } from './../../../../shared/common/interfaces';
import * as Utils from '../../../../shared/common/utils';


@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent implements OnInit, OnDestroy {

  isEditMode: boolean;
  question: IFormItem;
  note: IFormItem;
  storeSubscription: Subscription;

  constructor(
    public str: StringsService,
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('formTemplate').subscribe(
      (store) => {
        Utils.consoleLog('(FormFooterComponent) FormTemplate Store: ', 'limegreen', store);
        this.isEditMode = !store.isPreview;
        this.question = store.question;
        this.note = store.note;
      }
    );
  }

  get isDisplayAllowed() {
    if (this.note.value && this.note.isEnable) {
      return true;
    } else if (this.isEditMode) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
