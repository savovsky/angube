import { Component, OnInit } from '@angular/core';
import { FormSelectChoice } from 'src/app/shared/common/interfaces';

@Component({
  selector: 'app-form-answers-choice',
  templateUrl: './form-answers-choice.component.html',
  styleUrls: ['./form-answers-choice.component.css']
})
export class FormAnswersChoiceComponent implements OnInit {

  selected = 'singleChoice';

  options: FormSelectChoice[] = [
    {value: 'singleChoice', viewValue: 'single choice'},
    {value: 'multipleChoices', viewValue: 'multiple choices'}
  ];

  constructor() { }

  ngOnInit() {
  }

  changeClient(value) {
    console.log(value);
  }

}
