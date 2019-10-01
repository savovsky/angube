import { FormTemplateService } from './../../../services/form-template.service';
import { Component, OnInit } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';


@Component({
  selector: 'app-form-answers-choice',
  templateUrl: './form-answers-choice.component.html',
  styleUrls: ['./form-answers-choice.component.css']
})
export class FormAnswersChoiceComponent implements OnInit {

  isMultipleChoice: boolean;

  constructor(
    private formTemplateService: FormTemplateService,
    public str: StringsService
  ) { }

  ngOnInit() {
    this.getIsMultipleChoice();
  }

  getIsMultipleChoice() {
    this.isMultipleChoice = this.formTemplateService.formTemplate.isMultipleChoice;
  }

  onSlideChange(isSlideOn: boolean) {
    this.isMultipleChoice = isSlideOn;
    this.formTemplateService.setIsMultipleChoice(isSlideOn);
  }

}
