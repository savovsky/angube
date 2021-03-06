import { Component, Input } from '@angular/core';
import { Account } from '../../../shared/models/account.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  isLike: boolean;
  isFollow: boolean;

  @Input() user: Account;
  @Input() isFirst: boolean;

  onLike() {
    this.isLike = !this.isLike;
  }

  onFollow() {
    this.isFollow = !this.isFollow;
  }

  get routerLink() {
    return ['/app/users', this.user.userName];
  }

  get queryParams() {
    return { id: this.user.uid };
  }

  get userName() {
    return this.user.userName;
  }

  get userEmail() {
    return this.user.email;
  }

  get isUserBlocked() {
    return this.user.isBlocked;
  }

  get likeColor() {
    return this.isLike ? 'primary' : '';
  }

  get likeIcon() {
    return this.isLike ? 'star' : 'star_border';
  }

  get followColor() {
    return this.isFollow ? 'primary' : '';
  }

  get followIcon() {
    return this.isFollow ? 'assistant_photo' : 'outlined_flag';
  }

}
