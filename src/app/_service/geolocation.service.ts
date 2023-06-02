import { BehaviorSubject, Observable } from "rxjs";

export class GeolocationService {
  locationError: boolean = false;
  coordinates!: string;
  locationErrorMessage!: any;
  locationLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  locations: Observable<Object> = new Observable((observer) => {
    let watchId: number;
    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position: GeolocationPosition) => {
          this.coordinates =
            position.coords.latitude.toString() +
            "," +
            position.coords.longitude.toString();
          observer.next(position);
          this.locationLoaded.next(true);
        },
        (error: GeolocationPositionError) => {
          observer.error(error);
          this.locationError = true;
          this.locationErrorMessage = error.message;
          this.locationLoaded.next(true);
          console.log(error.message);
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
    this.locations.subscribe(() => {});
  }
}
