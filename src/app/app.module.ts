import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { NgOptimizedImage } from "@angular/common";

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

// components
import { HomeComponent } from "./home/home.component";
import { StartscreenComponent } from "./startscreen/startscreen.component";
import { SignupComponent } from "./startscreen/signup.component";
import { LoginComponent } from "./startscreen/login.component";
//import { CurrentTodayComponent } from "./_components/current-today/current-today.component";
import { InfoSmallComponent } from "./_components/info-small/info-small.component";
// import { InfoscreenComponent } from "./_components/infoscreen/infoscreen.component";
//import { CurrentHighlightsComponent } from "./_components/current-highlights/current-highlights.component";
//import { ForecastComponent } from "./_components/forecast/forecast.component";
import { ImprintComponent } from "./imprint/imprint.component";

//form components
import { SaveCityFormComponent } from "./_components/_forms/save-city-form/save-city-form.component";

// services
import { GeolocationService } from "./_service/geolocation.service";
import { APIDataService } from "./_service/api-data.service";
import { UserService } from "./_service/user.service";
import { DatabaseService } from "./_service/database.service";

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
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    StartscreenComponent,
    SignupComponent,
    LoginComponent,
    InfoSmallComponent,
    SaveCityFormComponent,
    HomeComponent,
    ImprintComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgOptimizedImage,

    //material design
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    DragDropModule,
  ],
  providers: [
    GeolocationService,
    APIDataService,
    UserService,
    DatabaseService,
    RouterAuthGuard,
  ],
  bootstrap: [AppComponent],
  exports: [InfoSmallComponent, SaveCityFormComponent],
})
export class AppModule {}
