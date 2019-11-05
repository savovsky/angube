import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { StringsService } from 'src/app/shared/services/strings.service';
import * as FormTemplateAction from './../../../../shared/store/actions/formTemplate.action';
import { IAppStore } from './../../../../shared/common/interfaces';
import * as Utils from '../../../../shared/common/utils';


@Component({
  selector: 'app-form-answers-choice',
  templateUrl: './form-answers-choice.component.html',
  styleUrls: ['./form-answers-choice.component.css']
})
export class FormAnswersChoiceComponent implements OnInit, OnDestroy {

  isMultipleChoice: boolean;
  storeSubscription: Subscription;

  constructor(
    public str: StringsService,
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('formTemplate').subscribe(
      (store) => {
        Utils.consoleLog('(FormAnswersChoiceComponent) FormTemplate Store: ', 'limegreen', store);
        this.isMultipleChoice = store.isMultipleChoice;
      }
    );
  }

  onSlideChange() {
    this.store.dispatch(new FormTemplateAction.SetIsMultipleChoice());
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
