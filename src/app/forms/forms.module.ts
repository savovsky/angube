import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';
import { MatRadioModule, MatSelectModule } from '@angular/material';


import { FormComponent } from './components/form/form.component';
import { FormQuestionComponent } from './components/form-question/form-question.component';
import { FormPreviewComponent } from './components/form-preview/form-preview.component';
import { FormSelectChoiceComponent } from './components/form-select-choice/form-select-choice.component';



@NgModule({
  declarations: [
    FormComponent,
    FormQuestionComponent,
    FormPreviewComponent,
    FormSelectChoiceComponent
  ],
  imports: [
    SharedModule,
    MatRadioModule,
    FormsRoutingModule,
    MatSelectModule
  ]
})
export class FormsModule { }
