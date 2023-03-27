import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { WeatherDetailsComponent } from "./weather-details/weather-details.component";

const routes: Routes = [
	{ path: "home", component: HomeComponent },
	{ path: "location", component: WeatherDetailsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
