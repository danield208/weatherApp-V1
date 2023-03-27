import { Component } from "@angular/core";
import { APIDataService } from "./_service/api-data.service";
import { GeolocationService } from "./_service/geolocation.service";
import { WeatherAPIService } from "./_service/weather-api.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	providers: [GeolocationService, WeatherAPIService, APIDataService],
})
export class AppComponent {
	location = this.geo.locations.subscribe((Response) => {
		this.location.unsubscribe();
		this.geo.locationLoaded.next(true);
	});

	checkLoadedLoc = this.geo.locationLoaded.subscribe((status) => {
		if (status) {
			this.getLocationData();
		}
	});

	constructor(private geo: GeolocationService, private api: WeatherAPIService, private data: APIDataService) {}

	getLocationData() {
		this.api.getData(this.geo.coordinates).subscribe((data) => {
			this.data.location.current = data.current;
			this.data.location.forecastday = data.forecast.forecastday;
			this.data.location.location = data.location;
			this.api.apiLoadFinished.next(true);
			console.log(this.data.location);
		});
	}
}
