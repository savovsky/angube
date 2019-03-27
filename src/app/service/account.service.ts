import { User } from '../interfaces/interfaces';

export class AccountService {

  private user: [string, any][];
  private orderList = [
    'userName',
    'firstName',
    'lastName',
    'birthdate',
    'email',
    'isBlocked',
    'isAdmin',
    'uid'
  ];

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
