import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../modules/mat-components.module';
import { AdminItemGuardPipe, AdminLinkGuardPipe } from './pipes/admin.pipe';
import { EmptyPipe, StringPipe } from './pipes/string.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';


@NgModule({
  declarations: [
    AdminItemGuardPipe,
    AdminLinkGuardPipe,
    EmptyPipe,
    StringPipe,
    CapitalizePipe
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatComponentsModule,
    AdminItemGuardPipe,
    AdminLinkGuardPipe,
    EmptyPipe,
    StringPipe,
    CapitalizePipe
  ]
})
export class SharedModule { }
