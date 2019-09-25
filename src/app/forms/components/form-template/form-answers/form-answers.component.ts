import { FormTemplateService } from './../../../services/form-template.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.css']
})
export class FormAnswersComponent implements OnInit, OnDestroy {

  isSingleChoice: boolean;
  isMultipleChoice: boolean;
  answersTypeChangeSubscription: Subscription;

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  ngOnInit() {
    this.setIsSingleChoice();
    this.setIsMultipleChoice();

    this.answersTypeChangeSubscription = this.formTemplateService.answersTypeChanged.subscribe(
      () => {
        this.setIsSingleChoice();
        this.setIsMultipleChoice();
      }
    );
  }

  ngOnDestroy() {
    this.answersTypeChangeSubscription.unsubscribe();
  }

  setIsSingleChoice() {
    this.isSingleChoice = this.formTemplateService.answersTypeId === 'singleChoice';
  }

  setIsMultipleChoice() {
    this.isMultipleChoice = this.formTemplateService.answersTypeId === 'multipleChoice';
  }

}
