import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { HttpClientModule } from "@angular/common/http";

// components
import { ImprintComponent } from "./_components/imprint/imprint.component";
import { PagenotfoundComponent } from "./_components/pagenotfound/pagenotfound.component";

// services
import { GeolocationService } from "./_service/geolocation.service";
import { UserService } from "./_service/user.service";
import { DatabaseService } from "./_service/database.service";
import { SavedWeatherDataService } from "./_service/savedWeatherData.service";
import { GoogleMapsApiService } from "./_service/google-maps-api.service";

// guards
import { RouterAuthGuard } from "./_guard/router.guard";

//material design
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
	declarations: [AppComponent, ImprintComponent, PagenotfoundComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule],
	providers: [
		GeolocationService,
		UserService,
		DatabaseService,
		RouterAuthGuard,
		SavedWeatherDataService,
		GoogleMapsApiService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
