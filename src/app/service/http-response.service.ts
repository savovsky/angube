import { Subject, AsyncSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root' // TODO What is this?
// })
export class HttpResponseService {
    signUpUserSuccess = new Subject();
    signUpUserError = new Subject();  // TODO Is there a better way?
    signInUserError = new Subject();
}
