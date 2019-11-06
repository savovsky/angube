import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { StringsService } from 'src/app/shared/services/strings.service';
import * as FormTemplateAction from './../../../../shared/store/actions/formTemplate.action';
import { IAppStore } from './../../../../shared/common/interfaces';
import * as Utils from '../../../../shared/common/utils';

@Component({
  selector: 'app-form-answers-tools',
  templateUrl: './form-answers-tools.component.html',
  styleUrls: ['./form-answers-tools.component.css']
})
export class FormAnswersToolsComponent  implements OnInit, OnDestroy {

  optionsCount: number;
  storeSubscription: Subscription;

  constructor(
    public str: StringsService,
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('formTemplate').subscribe(
      (store) => {
        Utils.consoleLog('(FormAnswersToolsComponent) FormTemplate Store: ', 'limegreen', store);
        this.optionsCount = store.options.length;
      }
    );
  }

  onAddOption() {
    this.store.dispatch(new FormTemplateAction.AddOption());
  }

  isOptionsTen() {
    return this.optionsCount > 9;
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
