import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { NgOptimizedImage } from "@angular/common";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

// components
import { OverviewComponent } from "./weather-details/overview/overview.component";
import { InfoComponent } from "./weather-details/info/info.component";
import { ForecastComponent } from "./weather-details/forecast/forecast.component";
import { ForecastDayComponent } from "./weather-details/forecast/forecast-day.component";
import { HomeComponent } from "./home/home.component";
import { StartscreenComponent } from "./startscreen/startscreen.component";
import { SignupComponent } from "./startscreen/signup.component";
import { LoginComponent } from "./startscreen/login.component";
import { AppComponent } from "./app.component";
import { CurrentTodayComponent } from "./_components/current-today/current-today.component";

// services
import { GeolocationService } from "./_service/geolocation.service";
import { WeatherDetailsComponent } from "./weather-details/weather-details.component";
import { APIDataService } from "./_service/api-data.service";
import { UserService } from "./_service/user.service";
import { DatabaseService } from "./_service/database.service";
import { ThemeService } from "./_service/theme.service";

// guards
import { RouterAuthGuard } from "./_guard/router.guard";

//material design
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { InfoSmallComponent } from "./_components/info-small.component";
import { InfoscreenComponent } from "./_components/infoscreen/infoscreen.component";
import { MatDividerModule } from "@angular/material/divider";
@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    InfoComponent,
    ForecastComponent,
    ForecastDayComponent,
    HomeComponent,
    WeatherDetailsComponent,
    StartscreenComponent,
    SignupComponent,
    LoginComponent,
    InfoSmallComponent,
    CurrentTodayComponent,
    InfoscreenComponent,
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
    MatDividerModule,
    NgOptimizedImage,
  ],
  providers: [
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
