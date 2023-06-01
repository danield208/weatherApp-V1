import { Routes } from "@angular/router";
import { SignupComponent } from "./login_signup/signup.component";

export const StartscreenRoutes: Routes = [
  {
    path: "login",
    loadComponent: () =>
      import("./login_signup/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "signup",
    component: SignupComponent,
  },
];
