/*
 * With unsubscribe, you can cancel the ongoing execution
 * Here I'm unsubscribing using a delay that I wrote, unsubscribeAfterDuration
 * I'm trying to learn a better way of doing this, and I need a better way to test
 * when it's happening.
 */

import {from, of} from 'rxjs';
import {delay, concatMap} from 'rxjs/operators';
import { unsubscribeAfterDuration } from '~lib/unsubscribeAfterDuration';

console.log('start');

// https://observablehq.com/@btheado/rxjs-inserting-a-delay-between-each-item-of-a-stream
/*
 * I tried using
 * asyncScheduler
 * scheduled
 * interval
 * queueScheduler
 * scan
 * throttleTime
 * take
 *
 * I ended up using, much to my surprise...
 * from
 * of
 * delay
 * concatMap
 */

// I would like to do something like what Ben Lesh said using takeUntil with
// https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87
// but I'm uncertain about if it was working correctly as when I implemented something
// similar, and would run it in Quokka... the initial run would print out all 3
// numbers... but subsequent runs from within the same run window would only print
// out 10 and then 20.
// It would be nice to write a legitimate unit test for it to see what that does.

// Or what this guy says
// https://medium.com/angular-in-depth/the-best-way-to-unsubscribe-rxjs-observable-in-the-angular-applications-d8f9aa42f6a0

let numbers = [10, 20, 30];
let delayTime = 1000;
let unsubscribeDelayTime = (numbers.length + 1) * delayTime

const subscription = from(numbers)
    .pipe(
        concatMap(i => of(i).pipe(delay(delayTime)))
    )
    .subscribe(x => console.log(x));

console.log('end');

unsubscribeAfterDuration(unsubscribeDelayTime, [subscription]);