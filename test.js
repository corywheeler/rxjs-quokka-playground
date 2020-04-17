import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

const testDiv = document.getElementById('testDiv');

testDiv.textContent

fromEvent(document, 'click')
	.pipe(scan(count => count + 1, 0))
	.subscribe(count => console.log(`Clicked ${count} times`));

let clickEvent = new window.Event('click');

document.dispatchEvent(clickEvent);