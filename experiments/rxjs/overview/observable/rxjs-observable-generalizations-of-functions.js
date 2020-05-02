
/*
 * Observables are like functions with zero arguments, but generalize those to allow multiple values.
 */

console.log('Observables are like functions with zero arguments, but generalize those to allow multiple values.');

// The old school way
function foo() {
    console.log('Old School Hello')
    return 42;
}

const x = foo.call();
console.log(x);

const y = foo.call();
console.log(y);

// You can do the same thing with Observables

import { Observable } from 'rxjs';

const foo2 = new Observable(subscriber => {
    console.log('RxJS Hello');
    subscriber.next(42);
});

foo2.subscribe(x => console.log(x));

foo2.subscribe(y => console.log(y));


// Subscribing to an Observable is analogous to calling a Function.

console.log('Subscribing to an Observable is analogous to calling a Function.');

// Observables like functions are synchronous

// A synchronous example the old school way
console.log('Synchronous: before old school call');
console.log(foo.call());
console.log('Synchronous: after old school call');

// The same behaviour the Observable way

console.log('Synchronous: before RxJS way');
foo2.subscribe(x => console.log(x));
console.log('Synchronous: after RxJS way')

// Observables are able to deliver values either synchronously or asynchronously.

console.log('Observables are able to deliver values either synchronously or asynchronously.');

function foo3() {
    console.log('Hello');
    return 42;
    return 100; // dead code, will never happen
}

const foo4 = new Observable( subscriber => {
    console.log('Hello');
    subscriber.next(42);
    subscriber.next(100);
    subscriber.next(200);
})

console.log('RxJS before multi-value push');
foo4.subscribe(x => { console.log(x) });
console.log('RxJS after multi-value push');

console.log('Observables can return values asynchronously.');

const foo5 = new Observable( subscriber => {
    console.log('Hello');
    subscriber.next(42);
    subscriber.next(100);
    subscriber.next(200);
    setTimeout(() => {
        subscriber.next(300);
    }, 1000);
})

console.log('RxJS before asynchronous delivery');
foo5.subscribe(x => {
    console.log(x);
})
console.log('RxJS after asynchronous delivery');