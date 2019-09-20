import { NgModule, InjectionToken } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';
import { MatRadioModule } from '@angular/material';


import { FormComponent } from './components/form/form.component';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { FormQuestionComponent } from './components/form-question/form-question.component';
import { FormAnswersComponent } from './components/form-answers/form-answers.component';
import { FormFooterComponent } from './components/form-footer/form-footer.component';
import { FormPreviewComponent } from './components/form-preview/form-preview.component';
import { FormTemplateComponent } from './components/form-template/form-template.component';



@NgModule({
  declarations: [
    FormComponent,
    FormHeaderComponent,
    FormQuestionComponent,
    FormAnswersComponent,
    FormFooterComponent,
    FormPreviewComponent,
    FormTemplateComponent
  ],
  imports: [
    SharedModule,
    MatRadioModule,
    FormsRoutingModule
  ]
})
export class FormsModule { }
