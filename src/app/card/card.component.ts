import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../account/account.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() user: Account;

  constructor() { }

  ngOnInit() {
  }

}
