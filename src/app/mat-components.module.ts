import { NgModule } from '@angular/core';
// import {MatInputModule} from '@angular/material/input';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
import {
  MatListModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatProgressBarModule,
  MatMenuModule,
  MatInputModule
} from '@angular/material';


@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule
  ]
})
export class MatComponentsModule { }
