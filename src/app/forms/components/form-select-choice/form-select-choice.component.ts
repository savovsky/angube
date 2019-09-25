import { Component, OnInit } from '@angular/core';
import { FormSelectChoice } from 'src/app/shared/common/interfaces';

@Component({
  selector: 'app-form-select-choice',
  templateUrl: './form-select-choice.component.html',
  styleUrls: ['./form-select-choice.component.css']
})
export class FormSelectChoiceComponent implements OnInit {

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
