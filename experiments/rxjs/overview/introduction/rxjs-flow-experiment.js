/*
 * Code example came from RxJS - Overview page
 * https://rxjs-dev.firebaseapp.com/guide/overview
 */

import { fromEvent, interval } from 'rxjs';
import { scan, take, throttleTime } from 'rxjs/operators';
import {sleep} from '~lib/sleep';
import { unsubscribeAfterDuration } from '~lib/unsubscribeAfterDuration';

// Common control variables
const clicksToRecord = 5;
const totalClicksToTake = clicksToRecord * 10;
const clickEvent = new window.Event('click');
const throttleTimeMilliseconds = 1000;
const clickTimingInMilliseconds = 100;

/*
 * Using the traditional way, this is how you would allow at most one click per second
 */
let count = 0;
let lastClick = Date.now() - throttleTimeMilliseconds;

const oldSchoolClickedHandler = () => {
	if (Date.now() - lastClick >= throttleTimeMilliseconds) {
		console.log(`Old School Clicked ${++count} times`);
		lastClick = Date.now();
	}
}

document.addEventListener('click', oldSchoolClickedHandler);

// There will be 10 iterations of this for loop before the second click is registered by the click handler,
// and 10 iterations before each of the successive clicks are registered by the click handler. The sleep delays
// the next run of the the loop by 100 milliseconds... giving us 10 iterations per click.

let loopCounter = 0;
for (loopCounter; loopCounter < totalClicksToTake; loopCounter++) {
	document.dispatchEvent(clickEvent);
	await sleep(clickTimingInMilliseconds);
}

console.log(`The loop ran ${loopCounter} times. Adjust the loop control to a larger value if you only saw it run once.`);

// Unbind the oldSchoolClickedHandler event listener so we can see the RxJS handler in isolation.
document.removeEventListener('click', oldSchoolClickedHandler);

/*
 * RxJS has a whole range of operators that helps you control how the events flow through your observables.
 * Here is an example showing throttle and scan. This will only record 5 clicks (one every 2 seconds)
 * even though the interval is set up to fire every 100 milliseconds.
 */

const clickSubscription = fromEvent(document, 'click')
	.pipe(
		throttleTime(throttleTimeMilliseconds),
		scan(count => count + 1, 0)
	)
	.subscribe(count => console.log(`RxJS Clicked ${count} times`));

const clickDispatchObservable = interval(clickTimingInMilliseconds)
							.pipe(take(totalClicksToTake));

const clickDispatchSubscription = clickDispatchObservable.subscribe(val => { document.dispatchEvent(clickEvent) });

// turn off the subscriptions, thus ending the program
const unsubscriptionMilliseconds = throttleTimeMilliseconds * clicksToRecord;
unsubscribeAfterDuration(unsubscriptionMilliseconds, [clickDispatchSubscription, clickSubscription]);