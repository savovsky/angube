import { Component, OnInit } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.css']
})
export class FormHeaderComponent implements OnInit {

  formTitle = '';
  currentUserName = 'current user';
  today: number = Date.now();

  constructor(
    public str: StringsService
  ) { }

  ngOnInit() {
  }

}
