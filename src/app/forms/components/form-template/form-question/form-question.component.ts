import { Component, OnInit } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';


@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent implements OnInit {

  formQuestion = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
  'Class aptent taciti add litora?';
  formNote = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aptent taciti sociosqu add litora.' +
  'Aliquam lobortis fermentum justo car maximus. Class aptent taciti sociosqu add litora.';

  constructor(
    public str: StringsService
  ) { }

  ngOnInit() {
  }

}
