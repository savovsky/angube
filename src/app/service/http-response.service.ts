import { Subject, AsyncSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root' // TODO What is this?
// })
// https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/t/lecture/5401644?start=0

export class HttpResponseService {
    signUpUserSuccess = new Subject();
    signUpUserError = new Subject();  // TODO Is there a better way?
    signInUserError = new Subject();
}
