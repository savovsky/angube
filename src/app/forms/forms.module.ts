import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';
import { MatRadioModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';

import { FormComponent } from './components/form/form.component';
import { FormsComponent } from './components/forms/forms.component';
import { FormHeaderComponent } from './components/form-template/form-header/form-header.component';
import { FormTemplateComponent } from './components/form-template/form-template/form-template.component';
import { FormQuestionComponent } from './components/form-template/form-question/form-question.component';
import { FormAnswersComponent } from './components/form-template/form-answers/form-answers.component';
import { FormFooterComponent } from './components/form-template/form-footer/form-footer.component';
import { FormAnswersChoiceComponent } from './components/form-template/form-answers-choice/form-answers-choice.component';
import { FormAnswersRadioComponent } from './components/form-template/form-answers-radio/form-answers-radio.component';
import { FormAnswersCheckboxComponent } from './components/form-template/form-answers-checkbox/form-answers-checkbox.component';
import { FormEditMenuComponent } from './components/form-template/form-edit-menu/form-edit-menu.component';
import { FormAnswersToolsComponent } from './components/form-template/form-answers-tools/form-answers-tools.component';


@NgModule({
  declarations: [
    FormComponent,
    FormsComponent,
    FormHeaderComponent,
    FormTemplateComponent,
    FormQuestionComponent,
    FormAnswersComponent,
    FormFooterComponent,
    FormAnswersChoiceComponent,
    FormAnswersRadioComponent,
    FormAnswersCheckboxComponent,
    FormEditMenuComponent,
    FormAnswersToolsComponent
  ],
  imports: [
    SharedModule,
    MatRadioModule,
    FormsRoutingModule,
    MatSelectModule,
    MatSlideToggleModule
  ]
})
export class FormsModule { }
