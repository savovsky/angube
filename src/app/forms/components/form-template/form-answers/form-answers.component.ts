import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppStore } from './../../../../shared/common/interfaces';
import * as Utils from '../../../../shared/common/utils';

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.css']
})
export class FormAnswersComponent implements OnInit, OnDestroy {

  isEditMode: boolean;
  isMultipleChoice: boolean;
  storeSubscription: Subscription;

  constructor(
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('formTemplate').subscribe(
      (store) => {
        Utils.consoleLog('(FormAnswersComponent) FormTemplate Store: ', 'limegreen', store);
        this.isEditMode = !store.isPreview;
        this.isMultipleChoice = store.isMultipleChoice;
      }
    );
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
