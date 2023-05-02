import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { APIDataService } from "./api-data.service";

import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class DatabaseService {
	constructor(private http: HttpClient, private data: APIDataService, private router: Router) {}

	put(userUID: string, token: string, UserObject: any) {
		this.http
			.put(
				`https://weather-63e37-default-rtdb.europe-west1.firebasedatabase.app/users/${userUID}.json?auth=${token}`,
				UserObject
			)
			.subscribe((res) => {
				this.data.UserLoadedAndAuthenticated$.next(true);
				console.log(res);
				let result: any = res;
				this.data.userEmail = result.email;
				this.data.username = result.name;
				this.data.userCities = result.savedcities;
				this.router.navigateByUrl("/home");
			});
	}

	get(userUID: string, token: string) {
		this.http
			.get(`https://weather-63e37-default-rtdb.europe-west1.firebasedatabase.app/users/${userUID}.json?auth=${token}`)
			.subscribe((res) => {
				this.data.UserLoadedAndAuthenticated$.next(true);
				console.log(res);
				let result: any = res;
				this.data.userEmail = result.email;
				this.data.username = result.name;
				this.data.userCities = result.savedcities;
				this.router.navigateByUrl("/home");
			});
	}

	patch(userUID: string, token: string, object: { [key: string]: any }) {
		this.http
			.patch(
				`https://weather-63e37-default-rtdb.europe-west1.firebasedatabase.app/users/${userUID}.json?auth=${token}`,
				object
			)
			.subscribe((res) => {
				this.data.UserLoadedAndAuthenticated$.next(true);
				console.log(res);
				let result: any = res;
				this.data.userEmail = result.email;
				this.data.username = result.name;
				this.data.userCities = result.savedcities;
				this.router.navigateByUrl("/home");
			});
	}
}
