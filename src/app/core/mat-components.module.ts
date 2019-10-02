import { NgModule } from '@angular/core';

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
  MatExpansionModule,
  MatTooltipModule,
  MatDialogModule
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
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class MatComponentsModule { }
