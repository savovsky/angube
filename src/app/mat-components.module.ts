import { NgModule } from '@angular/core';
// import {MatExpansionModule} from '@angular/material/expansion';

import {
  MatListModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatProgressBarModule,
  MatMenuModule,
  MatInputModule,
  MatCardModule,
  MatTabsModule,
  MatExpansionModule
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
    MatProgressBarModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule
  ]
})
export class MatComponentsModule { }
