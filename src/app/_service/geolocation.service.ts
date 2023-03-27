import { BehaviorSubject, Observable } from "rxjs";

export class GeolocationService {
	locationError: boolean = false;
	coordinates!: string;
	loactionLoaded: BehaviorSubject<boolean>;

	locations: Observable<Object> = new Observable((observer) => {
		let watchId: number;

		// Simple geolocation API check provides values to publish
		if ("geolocation" in navigator) {
			watchId = navigator.geolocation.watchPosition(
				(position: GeolocationPosition) => {
					this.coordinates = position.coords.latitude.toString() + "," + position.coords.longitude.toString();
					console.log(this.coordinates);
					observer.next(position);
				},
				(error: GeolocationPositionError) => {
					observer.error(error);
				}
			);
		} else {
			observer.error("Geolocation not available");
			this.locationError = true;
		}

		// When the consumer unsubscribes, clean up data ready for next subscription.
		return {
			unsubscribe() {
				navigator.geolocation.clearWatch(watchId);
			},
		};
	});

	constructor() {
		this.loactionLoaded = new BehaviorSubject<boolean>(false);
	}
}

// Call subscribe() to start listening for updates.
// locationsSubscription = this.locations.subscribe({
// 	next(position) {
// 		console.log("Current Position: ", position);
// 		return position;
// 	},
// 	error(msg) {
// 		console.log("Error Getting Location: ", msg);
// 		return msg;
// 	},
// });

// Stop listening for location after 10 seconds
// timeout = setTimeout(() => {
// 	this.locationsSubscription.unsubscribe();
// }, 10000);

// ___________________________________________

// getPosition(): Promise<any> {
// 	return new Promise((resolve, reject) => {
// 		navigator.geolocation.getCurrentPosition(
// 			(resp) => {
// 				resolve({
// 					lng: resp.coords.longitude,
// 					lat: resp.coords.latitude,
// 				});
// 			},
// 			(err) => {
// 				reject(err);
// 			}
// 		);
// 	});
// }
