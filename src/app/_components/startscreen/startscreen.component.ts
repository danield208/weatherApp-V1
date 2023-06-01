import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { UserService } from "../../_service/user.service";
import { DatabaseService } from "../../_service/database.service";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login_signup/login.component";
import { SignupComponent } from "./login_signup/signup.component";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-startscreen",
  template: `
    <div>
      <main>
        <h1>Weather</h1>
        <button
          mat-raised-button
          *ngIf="router.url !== '/start/signup'"
          (click)="initSignUp()"
        >
          New here?
        </button>
        <button
          mat-raised-button
          *ngIf="router.url !== '/start/login'"
          (click)="initlogin()"
        >
          Login
        </button>
        <button mat-raised-button (click)="loginAsGuest()">
          Login as Guest
        </button>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ["./startscreen.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    SignupComponent,
    RouterModule,
    MatButtonModule,
  ],
})
export class StartscreenComponent implements AfterViewInit {
  guestParams: any = {
    email: "guest@weather.api",
    password: "guestPassword",
  };
  constructor(
    private user: UserService,
    public router: Router,
    private route: ActivatedRoute,
    private database: DatabaseService
  ) {}

  ngAfterViewInit(): void {
    if (localStorage.getItem("user")) {
      const localStorageString: any = localStorage.getItem("user");
      const user = JSON.parse(localStorageString);
      this.database.get(user.uid, user.token);
    }
  }

  loginAsGuest() {
    this.user.login(this.guestParams.email, this.guestParams.password);
  }

  initSignUp() {
    this.router.navigate(["signup"], { relativeTo: this.route });
  }

  initlogin() {
    this.router.navigate(["login"], { relativeTo: this.route });
  }
}
