import { IUser } from './../common/interfaces';

export class User implements IUser {

  constructor(
    public uid = '',
    public userName = '',
    public firstName = '',
    public lastName = '',
    public email = '',
    public birthdate = '',
    public isAdmin = false,
    public isBlocked = false,
    public phoneNumber = '',
    public communityId = ''
  ) { }

}
