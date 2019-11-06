import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { StringsService } from './../../../../shared/services/strings.service';
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
    public str: StringsService,
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('formTemplate').subscribe(
      (store) => {
        Utils.consoleLog('(FormAnswersComponent) FormTemplate Store: ', 'limegreen', store);
        this.isEditMode = !store.isPreviewMode;
        this.isMultipleChoice = store.isMultipleChoice;
      }
    );
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
