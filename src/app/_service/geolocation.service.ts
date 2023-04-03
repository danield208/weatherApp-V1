import { BehaviorSubject, Observable } from "rxjs";

export class GeolocationService {
	locationError: boolean = false;
	coordinates!: string;
	locationLoaded!: BehaviorSubject<boolean>;

	locations: Observable<Object> = new Observable((observer) => {
		let watchId: number;
		if ("geolocation" in navigator) {
			watchId = navigator.geolocation.watchPosition(
				(position: GeolocationPosition) => {
					this.coordinates = position.coords.latitude.toString() + "," + position.coords.longitude.toString();
					observer.next(position);
					this.locationLoaded.next(true);
				},
				(error: GeolocationPositionError) => {
					observer.error(error);
					this.locationError = true;
					this.locationLoaded.next(true);
				}
			);
		} else {
			observer.error("Geolocation not available");
			this.locationError = true;
			this.locationLoaded.next(true);
		}
		return {
			unsubscribe() {
				navigator.geolocation.clearWatch(watchId);
			},
		};
	});

	constructor() {
		this.locationLoaded = new BehaviorSubject<boolean>(false);
	}
}
