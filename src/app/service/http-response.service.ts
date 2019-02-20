import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root' // TODO What is this?
// })
export class HttpResponseService {
    // signUpUserSuccess = new Subject(); // TODO Remove if you do not need it!
    signUpUserError = new Subject();  // TODO Is there a better way?
}
