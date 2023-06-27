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

@NgModule({
	imports: [CommonModule, HomeRoutingModule, CommonModule, MatProgressSpinnerModule, MatIconModule, NgOptimizedImage],
	declarations: [
		InfoscreenComponent,
		ForecastComponent,
		CurrentTodayComponent,
		CurrentHighlightsComponent,
		SelectLocationComponent,
	],
})
export class HomeModule {}
