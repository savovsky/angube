
export class Account {

  // The sequence matters - check AccountService.
  constructor(
    public userName = '',
    public firstName = '',
    public lastName = '',
    public birthdate = '',
    public email = '',
    public isBlocked = false,
    public isAdmin = false,
    public uid = '',
    public communityId = ''
  ) { }

}
