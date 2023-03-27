import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { WeatherDetailsComponent } from "./weather-details/weather-details.component";

const routes: Routes = [
	{ path: "weather", component: MainPageComponent },
	{ path: "", component: HomeComponent },
	{ path: "location", component: WeatherDetailsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
