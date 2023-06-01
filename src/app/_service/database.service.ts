import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserdataModel } from "../_model/userdata.model";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  user!: UserdataModel;
  constructor(private http: HttpClient) {}
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

  updateSavedCities(savedcities: any) {
    const locStor: any = localStorage.getItem("user");
    const locStorJSON: any = JSON.parse(locStor);
    const userUID: string = locStorJSON.uid;
    const token: string = locStorJSON.token;
    const savedCitiesString: string = JSON.stringify(savedcities);

    return this.http.patch(
      `https://weather-63e37-default-rtdb.europe-west1.firebasedatabase.app/users/${userUID}.json?auth=${token}`,
      savedCitiesString
    );
  }
}
