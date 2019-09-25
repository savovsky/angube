import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';
import { MatRadioModule, MatSelectModule } from '@angular/material';

import { FormComponent } from './components/form/form.component';
import { FormsComponent } from './components/forms/forms.component';
import { FormHeaderComponent } from './components/form-template/form-header/form-header.component';
import { FormTemplateComponent } from './components/form-template/form-template/form-template.component';
import { FormQuestionComponent } from './components/form-template/form-question/form-question.component';
import { FormAnswersComponent } from './components/form-template/form-answers/form-answers.component';
import { FormFooterComponent } from './components/form-template/form-footer/form-footer.component';
import { FormAnswersChoiceComponent } from './components/form-template/form-answers-choice/form-answers-choice.component';


@NgModule({
  declarations: [
    FormComponent,
    FormsComponent,
    FormHeaderComponent,
    FormTemplateComponent,
    FormQuestionComponent,
    FormAnswersComponent,
    FormFooterComponent,
    FormAnswersChoiceComponent
  ],
  imports: [
    SharedModule,
    MatRadioModule,
    FormsRoutingModule,
    MatSelectModule
  ]
})
export class FormsModule { }
