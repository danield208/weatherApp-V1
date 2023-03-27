import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";

// components
import { OverviewComponent } from "./weather-details/overview/overview.component";
import { InfoComponent } from "./weather-details/info/info.component";
import { ForecastComponent } from "./weather-details/forecast/forecast.component";
import { ForecastDayComponent } from "./weather-details/forecast/forecast-day.component";
import { HomeComponent } from "./home/home.component";
import { LocationComponent } from "./home/location.component";
import { CityComponent } from "./home/city.component";

// services
import { WeatherAPIService } from "./_service/weather-api.service";
import { GeolocationService } from "./_service/geolocation.service";
import { WeatherDetailsComponent } from "./weather-details/weather-details.component";

@NgModule({
	declarations: [
		AppComponent,
		OverviewComponent,
		InfoComponent,
		ForecastComponent,
		ForecastDayComponent,
		HomeComponent,
		LocationComponent,
		CityComponent,
		WeatherDetailsComponent,
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule],
	providers: [WeatherAPIService, GeolocationService],
	bootstrap: [AppComponent],
})
export class AppModule {}
