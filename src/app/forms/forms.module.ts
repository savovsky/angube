import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { FormComponent } from './components/form/form.component';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { FormQuestionComponent } from './components/form-question/form-question.component';
import { FormAnswersComponent } from './components/form-answers/form-answers.component';
import { FormFooterComponent } from './components/form-footer/form-footer.component';


@NgModule({
  declarations: [
    FormComponent,
    FormHeaderComponent,
    FormQuestionComponent,
    FormAnswersComponent,
    FormFooterComponent
  ],
  imports: [
    SharedModule
  ]
})
export class FormsModule { }
