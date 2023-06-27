import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";

//Routing
import { HomeRoutingModule } from "./home-routing.module";

//components
import { InfoscreenComponent } from "./infoscreen/infoscreen.component";
import { ForecastComponent } from "./infoscreen/forecast/forecast.component";
import { CurrentTodayComponent } from "./infoscreen/current-today/current-today.component";
import { CurrentHighlightsComponent } from "./infoscreen/current-highlights/current-highlights.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { SelectLocationComponent } from "./select-location/select-location.component";
import { HomeComponent } from "./home.component";
import { InfoSmallComponent } from "./info-small/info-small.component";
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { SaveCityFormComponent } from "../_forms/save-city-form/save-city-form.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRippleModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
	imports: [
		CommonModule,
		HomeRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		MatIconModule,
		NgOptimizedImage,
		MatCardModule,
		MatSidenavModule,
		MatProgressBarModule,
		MatFormFieldModule,
		MatRippleModule,
		MatInputModule,
		MatButtonModule,
	],
	declarations: [
		InfoscreenComponent,
		ForecastComponent,
		CurrentTodayComponent,
		CurrentHighlightsComponent,
		SelectLocationComponent,
		HomeComponent,
		InfoSmallComponent,
		SaveCityFormComponent,
	],
	exports: [SaveCityFormComponent],
})
export class HomeModule {}
