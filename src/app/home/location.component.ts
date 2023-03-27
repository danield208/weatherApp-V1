import { Component, OnInit } from "@angular/core";
import { APIDataService } from "../_service/api-data.service";
import { GeolocationService } from "../_service/geolocation.service";
import { WeatherAPIService } from "../_service/weather-api.service";

@Component({
	selector: "app-location",
	template: `
		<div class="locationOff" *ngIf="!apiLoaded">location off</div>
		<div *ngIf="apiLoaded" class="top">
			<div>
				<span>Mein Standort</span>
				<span>{{ location.localtime.split(" ")[1] }}</span>
			</div>
			<span>{{ current.temp_c }}&#176;</span>
		</div>
		<div *ngIf="apiLoaded" class="bottom">
			<span>{{ current.condition.text }}</span>
			<span>H: {{ forecastday[0].day.maxtemp_c }}&#176; | T: {{ forecastday[0].day.mintemp_c }}&#176;</span>
		</div>
	`,
	styleUrls: ["city&location.component.scss"],
})
export class LocationComponent implements OnInit {
	current: any;
	forecastday: any;
	location: any;

	apiLoaded: boolean = false;

	constructor(private api: WeatherAPIService, private geo: GeolocationService, public data: APIDataService) {}

	ngOnInit(): void {
		this.geo.loactionLoaded.subscribe((status) => {
			if (status) {
				this.getData();
			}
		});
	}

	getData() {
		this.getCurrentData();
	}

	getCurrentData() {
		this.api.getData(this.geo.coordinates).subscribe((data) => {
			this.data.currentLocation = data;
			console.log(data);
			this.current = data.current;
			this.forecastday = data.forecast.forecastday;
			this.location = data.location;
			this.apiLoaded = true;
		});
	}
}
