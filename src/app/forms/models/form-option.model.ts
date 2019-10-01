import { v4 as uuid } from 'uuid';

export class FormOption {

  constructor(
    public id = uuid(),
    public value = 'option',
    public img = ''
  ) { }

}
