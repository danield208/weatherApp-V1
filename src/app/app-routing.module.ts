import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//guards
import { RouterAuthGuard } from "./_guard/router.guard";

//components
import { HomeComponent } from "./_components/home/home.component";

// routes
import { StartscreenRoutes } from "./_components/startscreen/startscreen-routing.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/start",
    pathMatch: "full",
  },
  {
    path: "start",
    loadComponent: () =>
      import("./_components/startscreen/startscreen.component").then(
        (m) => m.StartscreenComponent
      ),
    children: StartscreenRoutes,
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [RouterAuthGuard],
    children: [
      {
        path: "info/:id",
        loadComponent: () =>
          import("./_components/home/infoscreen/infoscreen.component").then(
            (m) => m.InfoscreenComponent
          ),
      },
      {
        path: "user",
        loadComponent: () =>
          import("./_components/userscreen/userscreen.component").then(
            (m) => m.UserscreenComponent
          ),
      },
      {
        path: "",
        loadComponent: () =>
          import(
            "./_components/select-location/select-location.component"
          ).then((m) => m.SelectLocationComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
