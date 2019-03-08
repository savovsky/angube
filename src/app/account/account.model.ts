
export class Account {

  constructor(
    public uid: string,
    public userName: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public birthdate: string,
    public isAdmin: boolean
  ) { }

}
