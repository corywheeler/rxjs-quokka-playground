/*
 * This shows how you can use takeUntil to unsubscribe from an Observable.
 * Note, that this will print 1 through 4, and then 2 seconds later
 * You will see the done call execute once the unsubscribe subject is completed.
 */

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

let unsubscribe = new Subject();

const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.next(4); // Is not delivered because it would violate the contract.
}).pipe(takeUntil(unsubscribe));

observable.subscribe({
    next(x) { console.log(`The value is ${x}.`) },
    complete() { console.log('Done, notice there was no value of 4 that was logged.') }
});

setTimeout(() => {
    unsubscribe.next();
    unsubscribe.complete();
}, 2000)
