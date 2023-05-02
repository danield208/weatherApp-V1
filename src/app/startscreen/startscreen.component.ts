import { AfterViewInit, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../_service/user.service";
import { DatabaseService } from "../_service/database.service";

@Component({
	selector: "app-startscreen",
	template: `
		<div>
			<main>
				<h1>Weather</h1>

				<button *ngIf="router.url !== '/start/signup'" (click)="initSignUp()">New here?</button>
				<button *ngIf="router.url !== '/start/login'" (click)="initlogin()">Login</button>
				<router-outlet></router-outlet>
			</main>
		</div>
	`,
	styleUrls: ["./startscreen.component.scss"],
})
export class StartscreenComponent implements AfterViewInit {
	constructor(
		private auth: UserService,
		public router: Router,
		private route: ActivatedRoute,
		private database: DatabaseService
	) {}

	ngAfterViewInit(): void {
		this.checkLocalSorageLogin();

		if (localStorage.getItem("user")) {
			const localStorageString: any = localStorage.getItem("user");
			const user = JSON.parse(localStorageString);
			this.database.get(user.uid, user.token);
		}
	}

	checkLocalSorageLogin() {}

	initSignUp() {
		this.router.navigate(["signup"], { relativeTo: this.route });
	}

	initlogin() {
		this.router.navigate(["login"], { relativeTo: this.route });
	}
}
