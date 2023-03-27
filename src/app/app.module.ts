import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";

// components
import { MainPageComponent } from "./main-page/main-page.component";
import { OverviewComponent } from "./main-page/overview/overview.component";
import { InfoComponent } from "./main-page/info/info.component";
import { ForecastComponent } from "./main-page/forecast/forecast.component";
import { ForecastDayComponent } from "./main-page/forecast/forecast-day.component";
import { HomeComponent } from "./home/home.component";
import { LocationComponent } from "./home/location.component";
import { CityComponent } from "./home/city.component";

// services
import { WeatherAPIService } from "./_service/weather-api.service";
import { GeolocationService } from "./_service/geolocation.service";
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

@NgModule({
	declarations: [
		MainPageComponent,
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
