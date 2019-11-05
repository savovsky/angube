import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IFormItem, IAppStore } from './../../../../shared/common/interfaces';
import * as Utils from '../../../../shared/common/utils';

@Component({
  selector: 'app-form-answers-radio',
  templateUrl: './form-answers-radio.component.html',
  styleUrls: ['./form-answers-radio.component.css']
})
export class FormAnswersRadioComponent implements OnInit, OnDestroy {

  isEditMode: boolean;
  options: IFormItem[];
  optionOther: IFormItem;
  storeSubscription: Subscription;

  yourAnswer: string; // TODO Wire up!

  constructor(
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('formTemplate').subscribe(
      (store) => {
        Utils.consoleLog('(FormAnswersRadioComponent) FormTemplate Store: ', 'limegreen', store);
        this.isEditMode = !store.isPreview;
        this.options = store.options;
        this.optionOther = store.optionOther;
      }
    );
  }

  get isDisplayAllowed() {
    if (this.optionOther.isEnable) {
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
