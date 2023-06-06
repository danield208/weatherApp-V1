import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//guards
import { RouterAuthGuard } from "./_guard/router.guard";

//components
import { HomeComponent } from "./_components/home/home.component";

// routes
import { StartscreenRoutes } from "./_components/startscreen/startscreen-routing.module";
import { animate, style, transition, trigger } from "@angular/animations";
import { InfoPlaceholderComponent } from "./_components/info-placeholder/info-placeholder.component";

const animation = trigger("fadeIn", [
  transition(":enter", [
    style({ opacity: 0 }),
    animate("225ms", style({ opacity: 1 })),
  ]),
  transition(":leave", [
    style({ opacity: 1 }),
    animate("225ms", style({ opacity: 0 })),
  ]),
]);

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
        data: { animation: animation },
      },
      {
        path: "info",
        component: InfoPlaceholderComponent,
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
