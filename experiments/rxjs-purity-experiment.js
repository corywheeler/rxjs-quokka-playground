// Code example came from RxJS - Overview page
// https://rxjs-dev.firebaseapp.com/guide/overview

import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

let clickEvent = new window.Event('click');

fromEvent(document, 'click')
	.pipe(scan(count => count + 1, 0))
	.subscribe(counter => console.log(`Clicked ${counter} times`));

for (let i = 0; i < 9; i++) {
	document.dispatchEvent(clickEvent);
}
