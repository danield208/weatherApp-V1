import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

// components
import { OverviewComponent } from "./weather-details/overview/overview.component";
import { InfoComponent } from "./weather-details/info/info.component";
import { ForecastComponent } from "./weather-details/forecast/forecast.component";
import { ForecastDayComponent } from "./weather-details/forecast/forecast-day.component";
import { HomeComponent } from "./home/home.component";
import { LocationComponent } from "./home/location.component";
import { CityComponent } from "./home/city.component";
import { StartscreenComponent } from "./startscreen/startscreen.component";
import { SignupComponent } from "./startscreen/signup.component";
import { LoginComponent } from "./startscreen/login.component";
import { AppComponent } from "./app.component";

// services
import { WeatherAPIService } from "./_service/weather-api.service";
import { GeolocationService } from "./_service/geolocation.service";
import { WeatherDetailsComponent } from "./weather-details/weather-details.component";
import { APIDataService } from "./_service/api-data.service";
import { UserService } from "./_service/user.service";
import { DatabaseService } from "./_service/database.service";

// guards
import { RouterAuthGuard } from "./_guard/router.guard";

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
		StartscreenComponent,
		SignupComponent,
		LoginComponent,
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
	providers: [WeatherAPIService, GeolocationService, APIDataService, UserService, RouterAuthGuard, DatabaseService],
	bootstrap: [AppComponent],
})
export class AppModule {}
