import { User } from '../shared/common/interfaces';
import { Account } from '../shared/models/account.model';

export class AccountService {

  private user: [string, any][];
  private orderList = Object.keys(new Account());

  /**
   * Mutate the user account object to array of its entries and
   * reorder this array elements by given list.
   * @param account User account object.
   */
  toOrderedArray(account: User) {
    this.user = Object.entries(account);
    this.orderByList();
    return this.user;
  }

  /**
   * Reorder user array elements by index from 'orderList' array.
   */
  orderByList() {
    this.orderList.forEach((el, index) => {
      const currentItemIndex = this.user.findIndex((item) => item[0] === el);
      this.user.splice(index, 0, this.user.splice(currentItemIndex, 1)[0]);
    });
  }

}
