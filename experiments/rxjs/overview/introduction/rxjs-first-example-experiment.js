/*
 * Code example came from RxJS - Overview page
 * https://rxjs-dev.firebaseapp.com/guide/overview
 */

import { fromEvent } from 'rxjs';
import { sleep } from '~lib/sleep';

/*
 * This is how you would have listened for an event without RxJS
 */

// Set up a click handler for use in showing the traditional way of click handling.
const oldSchoolClickedHandler = () => console.log('Old School Clicked!');

document.addEventListener('click', oldSchoolClickedHandler);

// Now fire some events
const clickEvent = new window.Event('click');

for (let i = 0; i < 3; i++) {
	document.dispatchEvent(clickEvent);
	await sleep(500);
}

// Unbind the oldSchoolClickedHandler event listener so we can see the RxJS handler in isolation.
document.removeEventListener('click', oldSchoolClickedHandler);

/*
 * This is how you would listen for listen for events using an Observable with RxJS
 */
const clickSubscription = fromEvent(document, 'click').subscribe(() => console.log('RxJS Clicked!'));

// Now fire some events.
for (let i = 0; i < 3; i++) {
	document.dispatchEvent(clickEvent);
	await sleep(500);
}

// Unsubscribe from the RxJS subscription for the click event.
clickSubscription.unsubscribe();