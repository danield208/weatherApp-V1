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
	location!: any;
	checkLoadedLoc!: any;

	constructor(private geo: GeolocationService, private api: WeatherAPIService, private data: APIDataService) {
		this.data.DataLoadedAndAuthenticated.subscribe((status) => {
			console.log("init");
			if (status) {
				console.log(status);
				this.initApp();
			}
		});
	}

	initApp() {
		this.location = this.geo.locations.subscribe((Response) => {
			this.location.unsubscribe();
		});

		this.checkLoadedLoc = this.geo.locationLoaded.subscribe((status) => {
			if (status) {
				console.log(this.geo.coordinates);
				if (!this.geo.locationError) {
					this.api.getLocationData();
				} else if (this.data.userCities.length > 0) {
					this.api.getSavedCities();
				}
			}
		});
	}
}
