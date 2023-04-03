import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { APIDataService } from "../_service/api-data.service";
import { WeatherAPIService } from "../_service/weather-api.service";

@Component({
	selector: "app-location",
	template: `
		<div class="locationOff" *ngIf="!apiLoaded">location off</div>
		<div *ngIf="apiLoaded" class="top" (click)="showDetails()">
			<div>
				<span>Mein Standort</span>
				<span>{{ this.data.locationData.location.localtime.split(" ")[1] }}</span>
			</div>
			<span>{{ this.data.locationData.current.temp_c }}&#176;</span>
		</div>
		<div *ngIf="apiLoaded" class="bottom" (click)="showDetails()">
			<span>{{ this.data.locationData.current.condition.text }}</span>
			<span
				>H: {{ this.data.locationData.forecastday[0].day.maxtemp_c }}&#176; | T:
				{{ this.data.locationData.forecastday[0].day.mintemp_c }}&#176;</span
			>
		</div>
	`,
	styleUrls: ["city&location.component.scss"],
})
export class LocationComponent {
	apiLoaded!: boolean;

	checkAPILoad = this.api.apiLoadFinished.subscribe((status) => {
		if (status) {
			this.apiLoaded = true;
			console.log(this.data.locationData);
		} else {
			this.apiLoaded = false;
		}
	});

	constructor(private api: WeatherAPIService, public data: APIDataService, private router: Router) {}

	showDetails() {
		this.router.navigateByUrl(
			"/details/" + this.data.locationData.location.lat + "," + this.data.locationData.location.lon
		);
	}
}
