import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FormTemplateAction from './../../../../shared/store/actions/formTemplate.action';
import { IAppStore } from './../../../../shared/common/interfaces';


@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent  implements OnInit {

  constructor(
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.store.dispatch(new FormTemplateAction.SetFormId());
    this.store.dispatch(new FormTemplateAction.SetFormDate());
  }
}
