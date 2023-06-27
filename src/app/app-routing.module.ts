import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//guards
import { RouterAuthGuard } from "./_guard/router.guard";

//components
import { PagenotfoundComponent } from "./_components/pagenotfound/pagenotfound.component";

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
    loadChildren: () =>
      import("./_components/home/home.module").then((m) => m.HomeModule),
    canActivate: [RouterAuthGuard],
  },
  {
    path: "**",
    pathMatch: "full",
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
