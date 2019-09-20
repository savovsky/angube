import { Component, OnInit } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent implements OnInit {

  today: number = Date.now();
  formTitle = '';
  currentUserName = 'current user';
  formQuestion = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
    'Class aptent taciti add litora?';
  formNote = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aptent taciti sociosqu add litora.' +
    'Aliquam lobortis fermentum justo car maximus. Class aptent taciti sociosqu add litora.';
  answers = ['option 1', 'option 2'];
  yourAnswer: string;

  constructor(
    public str: StringsService
  ) { }

  ngOnInit() {
  }

}
