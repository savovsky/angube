import { Component, OnInit } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.css']
})
export class FormFooterComponent implements OnInit {

  constructor(
    public str: StringsService
  ) { }

  ngOnInit() {
  }

}
