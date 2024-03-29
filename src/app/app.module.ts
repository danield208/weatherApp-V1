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
import { InfoSmallComponent } from "./_components/home/info-small/info-small.component";

@NgModule({
  declarations: [
    AppComponent,
    SaveCityFormComponent,
    ImprintComponent,
    InfoSmallComponent,
    HomeComponent,
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
  ],
  providers: [
    GeolocationService,
    APIDataService,
    UserService,
    DatabaseService,
    RouterAuthGuard,
  ],
  bootstrap: [AppComponent],
  exports: [SaveCityFormComponent],
})
export class AppModule {}
