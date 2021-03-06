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

let clickCounter = 0;
for (clickCounter; clickCounter < totalClicksToTake; clickCounter++) {
	document.dispatchEvent(clickEvent);
	await sleep(clickTimingInMilliseconds);
}

// Unbind the oldSchoolClickedHandler event listener so we can see the RxJS handler in isolation.
document.removeEventListener('click', oldSchoolClickedHandler);

/*
 * RxJS has a whole range of operators that helps you control how the events flow through your observables.
 * Here is an example showing throttle and scan.
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

// turn off the subscriptions
const unsubscriptionMilliseconds = throttleTimeMilliseconds * clicksToRecord;
unsubscribeAfterDuration(unsubscriptionMilliseconds, [clickDispatchSubscription, clickSubscription]);