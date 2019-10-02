import { IFormOption } from './../../shared/common/interfaces';
import { v4 as uuid } from 'uuid';

export class FormOptionModel implements IFormOption {

  constructor(
    public id = uuid(),
    public value = 'option',
    public img = ''
  ) { }

}
