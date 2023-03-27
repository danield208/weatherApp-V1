import { Component, OnInit } from "@angular/core";
import { APIDataService } from "./_service/api-data.service";
import { GeolocationService } from "./_service/geolocation.service";
import { WeatherAPIService } from "./_service/weather-api.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	providers: [GeolocationService, WeatherAPIService, APIDataService],
})
export class AppComponent implements OnInit {
	location = this.geo.locations.subscribe((Response) => {
		this.location.unsubscribe();
		this.geo.loactionLoaded.next(true);
	});

	constructor(public geo: GeolocationService, public api: WeatherAPIService) {}

	ngOnInit(): void {}
}
