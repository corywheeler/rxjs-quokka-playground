// Code example came from RxJS - Overview page
// https://rxjs-dev.firebaseapp.com/guide/overview

import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

/*
 * Without RxJS you would create an impure function, where other pieces of your code can mess up your state.
 * Here, any other code that has scope to the firstCount variable would be able to change it.
 */

// Set up a click handler for use in showing the traditional way of click handling.
const oldSchoolClickedHandler = () => console.log(`Old School Clicked ${++firstCount} times`);

let firstCount = 0;
document.addEventListener('click', oldSchoolClickedHandler);

// Now fire some events
const clickEvent = new window.Event('click');

for (let i = 0; i < 3; i++) {
	document.dispatchEvent(clickEvent);
}

// Unbind the oldSchoolClickedHandler event listener so we can see the RxJS handler in isolation.
document.removeEventListener('click', oldSchoolClickedHandler);


/*
 * Using RxJS you isolate the state.
 */
const clickSubscription = fromEvent(document, 'click')
						.pipe(scan(count => count + 1, 0))
						.subscribe(counter => console.log(`RxJS Clicked ${counter} times`));

// Now fire some more events
for (let i = 0; i < 3; i++) {
	document.dispatchEvent(clickEvent);
}

// Unsubscribe from the RxJS subscription for the click event.
clickSubscription.unsubscribe();
