import { FormTemplateService } from './../../../services/form-template.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.css']
})
export class FormAnswersComponent implements OnInit, OnDestroy {

  isMultipleChoice: boolean;
  formTemplateChangeSubscription: Subscription;

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  ngOnInit() {
    this.getIsMultipleChoice();
    this.formTemplateChangeSubscription = this.formTemplateService.formTemplateChanged.subscribe(
      () => { this.getIsMultipleChoice(); }
    );
  }

  getIsMultipleChoice() {
    this.isMultipleChoice = this.formTemplateService.formTemplate.isMultipleChoice;
  }

  isEditMode() {
    return !this.formTemplateService.isPreview;
  }

  ngOnDestroy() {
    this.formTemplateChangeSubscription.unsubscribe();
  }

}
