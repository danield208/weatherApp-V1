import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouterAuthGuard } from "./_guard/router.guard";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./startscreen/login.component";
import { SignupComponent } from "./startscreen/signup.component";
import { StartscreenComponent } from "./startscreen/startscreen.component";
// import { WeatherDetailsComponent } from "./weather-details/weather-details.component";

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
  { path: "home", component: HomeComponent, canActivate: [RouterAuthGuard] },
  // { path: "details/:id", component: WeatherDetailsComponent, canActivate: [RouterAuthGuard] },
  // { path: "home", component: HomeComponent },
  // { path: "details/:id", component: WeatherDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
