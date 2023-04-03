import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { APIDataService } from "./api-data.service";

@Injectable({
	providedIn: "root",
})
export class DatabaseService {
	databasePutLoaded!: BehaviorSubject<boolean>;

	constructor(private http: HttpClient, private data: APIDataService, private router: Router) {
		this.databasePutLoaded = new BehaviorSubject<boolean>(false);
	}

	put(userUID: string, token: string, UserObject: any) {
		this.http
			.put(
				`https://weather-63e37-default-rtdb.europe-west1.firebasedatabase.app/users/${userUID}.json?auth=${token}`,
				UserObject
			)
			.subscribe((res) => {
				console.log(res);
				let result: any = res;
				this.data.userEmail = result.email;
				this.data.username = result.name;
				this.data.userCities = result.savedcities;
				this.data.DataLoadedAndAuthenticated.next(true);
				this.router.navigateByUrl("/home");
			});
	}

	get(userUID: string, token: string) {
		this.http
			.get(`https://weather-63e37-default-rtdb.europe-west1.firebasedatabase.app/users/${userUID}.json?auth=${token}`)
			.subscribe((res) => {
				console.log(res);
				let result: any = res;
				this.data.userEmail = result.email;
				this.data.username = result.name;
				this.data.userCities = result.savedcities;
				this.data.DataLoadedAndAuthenticated.next(true);
				this.router.navigateByUrl("/home");
			});
	}

	patch(userUID: string, token: string, object: any) {
		this.http
			.patch(
				`https://weather-63e37-default-rtdb.europe-west1.firebasedatabase.app/users/${userUID}.json?auth=${token}`,
				object
			)
			.subscribe((res) => {
				console.log(res);
				let result: any = res;
				this.data.userEmail = result.email;
				this.data.username = result.name;
				this.data.userCities = result.savedcities;
				this.data.DataLoadedAndAuthenticated.next(true);
				this.router.navigateByUrl("/home");
			});
	}
}
