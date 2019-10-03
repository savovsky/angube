import { Component, OnInit, OnDestroy } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';
import { FormTemplateService } from './../../../services/form-template.service';
import { FormOptionModel } from './../../../models/form-option.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-answers-tools',
  templateUrl: './form-answers-tools.component.html',
  styleUrls: ['./form-answers-tools.component.css']
})
export class FormAnswersToolsComponent  implements OnInit, OnDestroy {

  optionsCount: number;
  formTemplateChangeSubscription: Subscription;

  constructor(
    private formTemplateService: FormTemplateService,
    public str: StringsService
  ) { }

  ngOnInit() {
    this.getOptionsCount();
    this.formTemplateChangeSubscription = this.formTemplateService.formTemplateChanged.subscribe(
      () => { this.getOptionsCount(); }
    );
  }

  onAddOption() {
    this.formTemplateService.addFormOption(new FormOptionModel());
  }

  isOptionsTen() {
    return this.optionsCount > 9;
  }

  getOptionsCount() {
    this.optionsCount = this.formTemplateService.formTemplate.options.length;
  }

  ngOnDestroy() {
    this.formTemplateChangeSubscription.unsubscribe();
  }

}
