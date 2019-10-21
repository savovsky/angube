import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './components/forms/forms.component';
import { FormTemplateComponent } from './components/form-template/form-template/form-template.component';


const routes: Routes = [
  {
    path: '',
    component: FormsComponent
  },
  {
    path: 'template',
    component: FormTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
