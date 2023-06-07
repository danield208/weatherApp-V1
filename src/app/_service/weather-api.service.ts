import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WeatherAPIService implements OnInit {
  baseURL: string = "https://api.weatherapi.com/v1";
  API_Key: string = "?key=cce16babc3924c04bcb130127230703";
  languages: any = {
    de: "&lang=de",
    en: "&lang=en",
  };
  airQualityDataInForecast: any = {
    yes: "&aqi=yes",
    no: "&aqi=no",
  };
  APIMethod: any = {
    curr: "/current.json",
    fore: "/forecast.json",
    search: "/search.json",
  };
  forecast_Days: number = 3;
  yesterday!: any;
  apiLoadFinished!: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.apiLoadFinished = new BehaviorSubject<boolean>(false);
    this.getYesterday();
  }

  ngOnInit(): void {}

  // main functions
  getYesterday() {
    const current = new Date();
    const yesterday = new Date(current.getTime());
    yesterday.setDate(current.getDate() - 1);
    const year = String(yesterday.getFullYear());
    const month = ("0" + (yesterday.getUTCMonth() + 1)).slice(-2);
    const day = String(yesterday.getDate());
    return year + "-" + month + "-" + day;
  }

  getData(
    location: string,
    type: string = "forecast",
    yesterday: string = this.getYesterday()
  ): Observable<any> {
    if (type == "history") {
      return this.http.get(
        this.baseURL +
          ("/" + type + ".json") +
          this.API_Key +
          ("&q=" + location) +
          this.languages.en +
          ("&dt=" + yesterday)
      );
    } else {
      return this.http.get(
        this.baseURL +
          ("/" + type + ".json") +
          this.API_Key +
          ("&q=" + location) +
          ("&days=" + this.forecast_Days) +
          this.languages.en +
          "&aqi=no&alerts=no"
      );
    }
  }

  autoCompleteAPI(city: string): Observable<any> {
    return this.http.get(
      this.baseURL + this.APIMethod.search + this.API_Key + "&q=" + city
    );
  }
}
