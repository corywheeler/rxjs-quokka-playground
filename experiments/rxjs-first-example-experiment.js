// Code example came from RxJS - Overview page
// https://rxjs-dev.firebaseapp.com/guide/overview

import { fromEvent } from 'rxjs';

let clickEvent = new window.Event('click');

fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));

for (let i = 0; i < 3; i++) {
	document.dispatchEvent(clickEvent);
}