import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
    setInterval(() => {
        subscriber.next('hi')
    }, 1000);

    // This will stop the subscription 2.5 seconds it's started sending the value 'hi'
    // to the subscriber. This shows how the observable can be in control of how long
    // an observer will get data over some duration of time.
    setTimeout(() => { subscriber.unsubscribe()}, 2500);
});


// Here you can see that observers of an observable can independently handle how they process
// their subscription. The subscribe function above is run independantly for each observer.
observable.subscribe({
    next(value) { console.log(value) }
});

observable.subscribe({
    next(value){ console.log(`${value} Cory`)}
})