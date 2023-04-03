import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { APIDataService } from "../_service/api-data.service";
import { UserService } from "../_service/user.service";
import { WeatherAPIService } from "../_service/weather-api.service";
import { GeolocationService } from "../_service/geolocation.service";
import { BehaviorSubject } from "rxjs";

@Component({
	selector: "app-home",
	template: `
		<span>Menu</span>
		<h1>Wetter</h1>
		<app-location></app-location>
		<hr />
		<p>Gespeicherte Orte:</p>
		<input placeholder="Ort Hinzufügen" />
		<content *ngIf="apiLoaded">
			<app-city *ngFor="let city of citiesData" [data]="city"></app-city>
		</content>
	`,
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
	apiLoaded!: boolean;
	citiesData!: Array<any>;
	checkAPILoad!: any;

	location!: any;
	checkLoadedLoc!: any;

	constructor(private api: WeatherAPIService, private data: APIDataService) {}

	ngOnInit(): void {
		this.initComponent();
	}

	initComponent() {
		this.checkAPILoad = this.api.apiLoadFinished.subscribe((status) => {
			if (status) {
				this.citiesData = this.data.userCitiesData;
				this.apiLoaded = true;
			} else {
				this.apiLoaded = false;
			}
		});
	}
}
