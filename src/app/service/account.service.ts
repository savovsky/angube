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
    'uid',
  ];

  toOrderedArray(account: User) {
    this.user = Object.entries(account);
    this.orderByList();
    return this.user;
  }

  orderByList() {
    this.orderList.forEach((el, index) => {
      const currentItemIndex = this.user.findIndex((item) => item[0] === el);
      this.user.splice(index, 0, this.user.splice(currentItemIndex, 1)[0]);
    });
  }

}
