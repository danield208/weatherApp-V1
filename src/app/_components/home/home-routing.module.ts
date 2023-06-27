import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { InfoPlaceholderComponent } from "./info-placeholder.component";
import { InfoscreenComponent } from "./infoscreen/infoscreen.component";
import { SelectLocationComponent } from "./select-location/select-location.component";

const routes: Routes = [
	{
		path: "",
		component: HomeComponent,
		children: [
			{
				path: "",
				component: SelectLocationComponent,
			},
			{
				path: "info/:id",
				component: InfoscreenComponent,
			},
			{
				path: "info",
				component: InfoPlaceholderComponent,
			},
		],
	},
	{
		path: "user",
		loadComponent: () => import("../userscreen/userscreen.component").then((m) => m.UserscreenComponent),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRoutingModule {}
