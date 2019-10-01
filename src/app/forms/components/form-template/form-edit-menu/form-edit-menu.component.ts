import { Component, Input } from '@angular/core';
import { StringsService } from 'src/app/shared/services/strings.service';

@Component({
  selector: 'app-form-edit-menu',
  templateUrl: './form-edit-menu.component.html',
  styleUrls: ['./form-edit-menu.component.css']
})
export class FormEditMenuComponent {

  @Input() itemId?: string;

  constructor(
    public str: StringsService
  ) { }

  onEdit() {
    console.log(this.itemId);
  }

  onDelete() {
    console.log(this.itemId);
  }

}
