import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.css']
})
export class FormAnswersComponent implements OnInit {

  answers = ['option 1', 'option 2'];
  yourAnswer: string;

  constructor() { }

  ngOnInit() {
  }

}
