export const unsubscribeAfterDuration = (milliseconds, subscriptions) => {
	return setTimeout(() => {
		subscriptions.forEach(subscription => subscription.unsubscribe());
	}, 5000);
}