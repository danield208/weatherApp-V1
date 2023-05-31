import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../../_service/user.service";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["./form.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(public user: UserService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  login() {
    if (this.loginForm.status == "VALID") {
      this.user.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.loginForm.reset();
    } else {
      console.error("error: form invalid");
    }
  }

  closeWindow() {
    this.router.navigateByUrl("/start");
  }
}
