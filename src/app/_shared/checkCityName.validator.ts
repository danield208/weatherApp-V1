import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator } from "@angular/forms";
import { WeatherAPIService } from "../_service/weather-api.service";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class checkCityNameValidator implements AsyncValidator {
  constructor(private api: WeatherAPIService) {}
  validate = (control: AbstractControl) => {
    const { value } = control;
    return this.api.getData(value).pipe(
      //   errors skip the map(). if we return null, means we got 200 response code
      map(() => {
        return null;
      }),
      catchError((err) => {
        if (err.error.token) {
          //catchError has to return a new Observable and "of" is a shortcut
          return of({ cityFound: true });
        }
        return of({ cityFound: true });
      })
    );
  };
}
