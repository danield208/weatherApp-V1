import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

// components
import { HomeComponent } from "./_components/home/home.component";
import { ImprintComponent } from "./_components/imprint/imprint.component";
import { InfoSmallComponent } from "./_components/home/info-small/info-small.component";
import { InfoPlaceholderComponent } from "./_components/home/info-placeholder.component";

//form components
import { SaveCityFormComponent } from "./_components/_forms/save-city-form/save-city-form.component";

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
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { PagenotfoundComponent } from "./_components/pagenotfound/pagenotfound.component";

@NgModule({
  declarations: [
    AppComponent,
    SaveCityFormComponent,
    ImprintComponent,
    InfoSmallComponent,
    HomeComponent,
    InfoPlaceholderComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    //material design
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
  ],
  providers: [
    GeolocationService,
    UserService,
    DatabaseService,
    RouterAuthGuard,
    SavedWeatherDataService,
    GoogleMapsApiService,
  ],
  bootstrap: [AppComponent],
  exports: [SaveCityFormComponent],
})
export class AppModule {}
