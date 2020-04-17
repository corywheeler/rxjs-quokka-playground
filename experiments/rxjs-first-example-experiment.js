/*
 * Code example came from RxJS - Overview page
 * https://rxjs-dev.firebaseapp.com/guide/overview
 */


import { fromEvent } from 'rxjs';

/*
 * This is how you would have listened for an event without RxJS
 */
document.addEventListener('click', () => console.log('Old School Clicked!'));

/*
 * This is how you would listen for listen for events using an Observable with RxJS
 */
fromEvent(document, 'click').subscribe(() => console.log('RxJS Clicked!'));

/*
 * Now fire some events. You will see both happen.
 */
let clickEvent = new window.Event('click');

for (let i = 0; i < 3; i++) {
	document.dispatchEvent(clickEvent);
}