import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../_service/user.service";

@Component({
	selector: "app-startscreen",
	template: `
		<div>
			<h1>Weather</h1>

			<button *ngIf="router.url !== '/start/signup'" (click)="initSignUp()">New here?</button>
			<button *ngIf="router.url !== '/start/login'" (click)="initlogin()">Login</button>
			<router-outlet></router-outlet>
		</div>
	`,
	styleUrls: ["./startscreen.component.scss"],
})
export class StartscreenComponent {
	constructor(private auth: UserService, public router: Router, private route: ActivatedRoute) {}

	initSignUp() {
		this.router.navigate(["signup"], { relativeTo: this.route });
	}

	initlogin() {
		this.router.navigate(["login"], { relativeTo: this.route });
	}
}
