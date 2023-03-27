import { AfterViewInit, Component } from "@angular/core";
import { WeatherAPIService } from "src/app/_service/weather-api.service";

@Component({
	selector: "app-forecast",
	template: `
		<h4 style="margin-bottom: 16px;">Forecast</h4>
		<div *ngIf="forecastReady" class="appForecast-main">
			<app-forecast-day *ngFor="let day of forecast" [data]="day" class="appForecast-day"></app-forecast-day>
		</div>
	`,
	styleUrls: ["./forecast.component.scss"],
})
export class ForecastComponent implements AfterViewInit {
	forecastReady: boolean = false;
	forecast!: any;

	constructor(private weatherAPI: WeatherAPIService) {
		// this.forecast = this.weatherAPI.getForecast();
		this.forecastReady = true;
	}

	ngAfterViewInit(): void {}
}
