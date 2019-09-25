import { Component, OnInit } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor(
    public str: StringsService
  ) { }

  ngOnInit() {
  }

}
