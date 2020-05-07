/*
 * You do not need to unsubscribe from a completed Observable.
 */

import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
   subscriber.next(1);
   subscriber.next(2);
   subscriber.next(3);
   subscriber.complete();
   subscriber.next(4); // Is not delivered because it would violate the contract.
});

observable.subscribe({
    next(x) { console.log(`The value is ${x}.`) },
    complete() { console.log('Done, notice there was no value of 4 that was logged.') }
});
