import { Component, Input } from '@angular/core';
import { Account } from '../common/account.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() user: Account;

}
