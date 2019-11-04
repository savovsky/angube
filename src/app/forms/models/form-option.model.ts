import { IFormItem } from './../../shared/common/interfaces';
import { v4 as uuid } from 'uuid';

export class FormOptionModel implements IFormItem {

  constructor(
    public id = uuid(),
    public img = '',
    public isEnable = true,
    public value = 'option'
  ) { }

}
