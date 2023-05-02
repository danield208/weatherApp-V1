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
import { ThemeService } from "./_service/theme.service";

import { DesktopComponent } from "./desktop/desktop.component";

// guards
import { RouterAuthGuard } from "./_guard/router.guard";

//material design
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { InfoSmallComponent } from './_components/info-small.component';
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
    DesktopComponent,
    InfoSmallComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    //material design
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  providers: [
    WeatherAPIService,
    GeolocationService,
    APIDataService,
    UserService,
    DatabaseService,
    RouterAuthGuard,
    ThemeService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
