import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { APIDataService } from "../_service/api-data.service";
import { UserService } from "../_service/user.service";
import { WeatherAPIService } from "../_service/weather-api.service";

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
export class HomeComponent {
	apiLoaded!: boolean;
	citiesData!: Array<any>;
	checkUserLoad!: any;
	checkAPILoad!: any;

	constructor(
		private api: WeatherAPIService,
		public data: APIDataService,
		private router: Router,
		private user: UserService
	) {
		this.checkUserLoad = this.data.DataLoadedAndAuthenticated.subscribe((status) => {
			if (status) this.initComponent();
		});
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
