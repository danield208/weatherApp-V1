import { Component, Input, OnInit } from "@angular/core";
import { WeatherAPIService } from "src/app/_service/weather-api.service";

@Component({
	selector: "app-forecast",
	template: `
		<h4 style="margin-bottom: 16px;">Forecast</h4>
		<div class="appForecast-main">
			<app-forecast-day *ngFor="let day of forecast" [data]="day" class="appForecast-day"></app-forecast-day>
		</div>
	`,
	styleUrls: ["./forecast.component.scss"],
})
export class ForecastComponent implements OnInit {
	@Input() forecast!: any;

	constructor(private api: WeatherAPIService) {}

	ngOnInit(): void {}
}
