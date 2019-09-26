import { FormTemplateService } from './../../../services/form-template.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-answers-radio',
  templateUrl: './form-answers-radio.component.html',
  styleUrls: ['./form-answers-radio.component.css']
})
export class FormAnswersRadioComponent implements OnInit {

  answers = ['option 1', 'option 2'];
  yourAnswer: string;

  constructor(
    public formTemplateService: FormTemplateService
  ) { }

  ngOnInit() {
  }

}
