import { FormTemplateService } from './../../../services/form-template.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-answers-tools',
  templateUrl: './form-answers-tools.component.html',
  styleUrls: ['./form-answers-tools.component.css']
})
export class FormAnswersToolsComponent implements OnInit {

  constructor(
    private formTemplateService: FormTemplateService
  ) { }

  ngOnInit() {
  }

}
