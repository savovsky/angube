import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent {

  color = 'primary';
  mode = 'indeterminate';
  diameter = 70;
  diameterS = 70;
  strokeWidth = 5;

}
