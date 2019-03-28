import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminItemGuardPipe, AdminLinkGuardPipe } from './pipes/admin.pipe';
import { EmptyPipe, StringPipe } from './pipes/string.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../modules/mat-components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminLinkGuardPipe,
    CapitalizePipe,
    StringPipe,
    EmptyPipe,
    AdminItemGuardPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatComponentsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatComponentsModule,
    AdminLinkGuardPipe,
    CapitalizePipe,
    StringPipe,
    EmptyPipe,
    AdminItemGuardPipe
  ]
})
export class SharedModule { }
