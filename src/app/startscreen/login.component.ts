import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../_service/user.service";

@Component({
  selector: "app-login",
  template: `
    <h1>Login</h1>
    <form #register="ngForm" (ngSubmit)="login(register.form)">
      <div class="form-group">
        <div class="aboveInput">
          <label for="email">E-Mail</label><br />
          <div *ngIf="email.touched && email.invalid" class="alert">
            Invalid
          </div>
        </div>
        <input
          #email="ngModel"
          type="text"
          name="email"
          class="form-control"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          [value]="emailV"
          ngModel
        />
      </div>
      <br />
      <div class="form-group">
        <div class="aboveInput">
          <label for="password">Password</label><br />
          <div *ngIf="password.touched && password.invalid" class="alert">
            Invalid
          </div>
        </div>
        <input
          #password="ngModel"
          type="password"
          name="password"
          class="form-control"
          required
          minlength="6"
          [value]="passwordV"
          [placeholder]="passwordPH"
          ngModel
        />
      </div>
      <br />
      <button type="submit">Login</button>
      <div>
        <span>Keep Login</span>
        <input
          type="checkbox"
          [(ngModel)]="saveLogin"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
    </form>
    <button class="close" (click)="closeWindow()">&#215;</button>
  `,
  styleUrls: ["./form.scss"],
})
export class LoginComponent {
  emailV: string = "";
  passwordV: string = "";
  passwordPH: string = "";
  saveLogin: boolean = false;

  constructor(public user: UserService, private router: Router) {}

  login(form: any) {
    if (form.status == "VALID") {
      this.user.login(form.value.email, form.value.password, this.saveLogin);
    } else {
      Object.entries(form.controls).forEach(([key, value]) => {
        let data: any = value;
        if (data.status == "INVALID") {
          if (key == "email") this.emailV = "Invalid";
          if (key == "password") this.passwordV = "";
          if (key == "password") this.passwordPH = "Invalid";
        }
      });
    }
  }

  closeWindow() {
    this.router.navigateByUrl("/start");
  }
}
