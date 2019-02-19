import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {
  MatListModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule
} from '@angular/material';


@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
  ]
})
export class MatComponentsModule { }
