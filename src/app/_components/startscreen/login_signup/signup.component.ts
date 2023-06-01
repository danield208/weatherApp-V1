import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../../_service/user.service";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-signup",
  templateUrl: "signup.component.html",
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
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(public user: UserService, private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  signup() {
    if (this.registerForm.status == "VALID") {
      this.user.signup(
        this.registerForm.value.name,
        this.registerForm.value.email,
        this.registerForm.value.password
      );
    } else {
      console.error("error: form not valid");
    }
  }

  closeWindow() {
    this.router.navigateByUrl("/start");
  }
}
