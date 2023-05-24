import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//guards
import { RouterAuthGuard } from "./_guard/router.guard";

//components
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./startscreen/login.component";
import { SignupComponent } from "./startscreen/signup.component";
import { StartscreenComponent } from "./startscreen/startscreen.component";
// import { InfoscreenComponent } from "./_components/infoscreen/infoscreen.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/start",
    pathMatch: "full",
  },
  {
    path: "start",
    component: StartscreenComponent,
    children: [
      { path: "signup", component: SignupComponent },
      { path: "login", component: LoginComponent },
    ],
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [RouterAuthGuard],
    children: [
      {
        path: ":id",
        loadComponent: () =>
          import("./_components/infoscreen/infoscreen.component").then(
            (m) => m.InfoscreenComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
