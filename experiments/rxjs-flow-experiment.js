/*
 * Code example came from RxJS - Overview page
 * https://rxjs-dev.firebaseapp.com/guide/overview
 */

import { fromEvent, interval } from 'rxjs';
import { scan, throttleTime } from 'rxjs/operators';

/*
 * Using the traditional way, this is how you would allow at most one click per second
 */
let count = 0;
let rate = 1000;
let lastClick = Date.now() - rate;

const oldSchoolClickedHandler = () => {
	if (Date.now() - lastClick >= rate) {
		console.log(`Old School Clicked ${++count} times`);
		lastClick = Date.now();
	}
}

document.addEventListener('click', oldSchoolClickedHandler);

//Now fire some events
const clickEvent = new window.Event('click');

let loopCounter = 0;
let loopControl = 900000;
for (loopCounter; loopCounter < loopControl; loopCounter++) {
	document.dispatchEvent(clickEvent);
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
		throttleTime(2000),
		scan(count => count + 1, 0)
	)
	.subscribe(count => console.log(`Clicked ${count} times`));

// set up an interval that will execute every 100 milliseconds
const intervalObservable = interval(100);

// dispatch the events every 100 milliseconds
const intervalSubscription = intervalObservable.subscribe(val => {
	document.dispatchEvent(clickEvent)
});

// turn off the subscriptions after 10 seconds.
setTimeout(() => {
	intervalSubscription.unsubscribe();
	clickSubscription.unsubscribe();
	}, 10000)