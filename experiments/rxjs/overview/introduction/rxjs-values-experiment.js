import {fromEvent, interval} from 'rxjs';
import { throttleTime, map, scan } from 'rxjs/operators';
import { sleep } from '~lib/sleep';
import { getRandomInt } from '~lib/getRandomInt';

/*
 * You can transform the values passed through your observables.
 */

/*
 * Here's how you can add the current mouse x position for every click, in plain JavaScript.
 * Even though we dispacth 50 events, only 5 are recorded... one for every 10 iterations.
 */

// Set up an old school click handler that will record the sum of the x positions
// from click events passed into it.
let sumOfXPositions = 0;
const maximumClickRateInMilliseconds = 1000;
let lastClick = Date.now() - maximumClickRateInMilliseconds;

const oldSchoolClickedHandler = event => {

	if(Date.now() - lastClick >= maximumClickRateInMilliseconds) {
		sumOfXPositions += event.clientX;
		console.log(`Old School Sum of x-position's ${sumOfXPositions}`);
		lastClick = Date.now();
	}
}

document.addEventListener('click', oldSchoolClickedHandler);

const dispatchEventsForOldWay = async () => {
	const clickEvent = new window.Event('click');

	for (let i = 0; i < 50; i++) {
		clickEvent.clientX = getRandomInt(5000);
		document.dispatchEvent(clickEvent);
		await sleep(100);
	}
}

// run the old way, and clean up the click handler
const runTheOldWay = async () => {
	await dispatchEventsForOldWay();
	document.removeEventListener('click', oldSchoolClickedHandler);
}

await runTheOldWay();

/*
 * This is how the same would be accomplished in RxJS. This will only record 5 clicks (one every 2 seconds)
 * even though the interval is set up to fire every 100 milliseconds. The throttle in the pipe is throttling
 * out the additional clicks.
 */
const clickSubscription = fromEvent(document, 'click')
	.pipe(
		throttleTime(1000),
		map(event => event.clientX),
		scan((sum, clientX) => sum + clientX, 0)
	)
	.subscribe(count => console.log(`RxJS Sum of x-positions ${count}`));

// set up an interval that will execute every 100 milliseconds
const intervalObservable = interval(100);

// dispatch the events every 100 milliseconds
const intervalSubscription = intervalObservable.subscribe(val => {
	const clickEvent = new window.Event('click');
	clickEvent.clientX = getRandomInt(5000);
	document.dispatchEvent(clickEvent)
});

// turn off the subscriptions after 5 seconds, thus ending the program
setTimeout(() => {
	intervalSubscription.unsubscribe();
	clickSubscription.unsubscribe();
}, 5000)