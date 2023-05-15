import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { APIDataService } from "./api-data.service";
import { Observable, Subscription } from "rxjs";
import { UserdataModel } from "../_model/userdata.model";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  user!: UserdataModel;
  constructor(
    private http: HttpClient,
    private data: APIDataService,
    private router: Router
  ) {}
  put(userUID: string, token: string, UserString: string): Observable<Object> {
    return this.http.put(
      `https://weather-63e37-default-rtdb.europe-west1.firebasedatabase.app/users/${userUID}.json?auth=${token}`,
      UserString
    );
  }
  get(userUID: string, token: string): Observable<Object> {
    return this.http.get(
      `https://weather-63e37-default-rtdb.europe-west1.firebasedatabase.app/users/${userUID}.json?auth=${token}`
    );
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
