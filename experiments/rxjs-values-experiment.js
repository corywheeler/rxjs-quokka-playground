/*
 * You can transform the values passed through your observables.
 */

/*
 * Here's how you can add the current mouse x position for every click, in plain JavaScript
 */

// Create random integers between 0 and highestValue parameter
const getRandomInt = highestValue => {
	return Math.floor(Math.random() * Math.floor(highestValue));
}

// sleep function used to control the rate limit for clicks
const sleep = milliseconds => {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// Set up an old school click handler that will record the sum of the x positions
// from click events passed into it.
let sumOfXPositions = 0;
const maximumClickRateInMilliseconds = 1000;

const oldSchoolClickedHandler = event => {
	let lastClick = Date.now() - maximumClickRateInMilliseconds;

	if(Date.now() - lastClick >= maximumClickRateInMilliseconds) {
		sumOfXPositions += event.clientX;
		console.log(`Sum of x-position's ${sumOfXPositions}`);
		lastClick = Date.now();
	}
}

document.addEventListener('click', oldSchoolClickedHandler)

const dispatchEventsForOldWay = async () => {
	const clickEvent = new window.Event('click');

	for (let i = 0; i < 5; i++) {
		clickEvent.clientX = getRandomInt(5000);
		document.dispatchEvent(clickEvent);
		await sleep(2000);
	}
}

// run the old way, and clean up the click handler
const runOldWay = async () => {
	await dispatchEventsForOldWay();
	document.removeEventListener('click', oldSchoolClickedHandler);
}

runOldWay();



