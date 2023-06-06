import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WeatherAPIService implements OnInit {
  baseURL = "https://api.weatherapi.com/v1";
  API_Key = "?key=cce16babc3924c04bcb130127230703";
  languages: any = {
    de: "&lang=de",
    en: "&lang=en",
  };
  airQualitiyDataInForecast: any = {
    yes: "&aqi=yes",
    no: "&aqi=no",
  };
  APIMethod: any = {
    curr: "/current.json",
    fore: "/forecast.json",
    search: "/search.json",
  };

  // Forecast Info
  forecast_Days: number = 3;
  forecastAlerts: string = "&alerts=no";

  // history
  yesterday!: any;

  // booleans for init
  apiLoadFinished!: BehaviorSubject<boolean>;

  runningTasks: Array<any> = [];

  // dataModel for location data
  dataModel = {
    coords: "",
    current: {},
    forecastday: {},
    location: {},
    yesterday: {},
  };

  constructor(private http: HttpClient) {
    this.apiLoadFinished = new BehaviorSubject<boolean>(false);
    this.getYesterday();
  }

  ngOnInit(): void {}

  // main functions
  getYesterday() {
    let current = new Date();
    let yesterday = new Date(current.getTime());
    yesterday.setDate(current.getDate() - 1);
    let year = String(yesterday.getFullYear());
    let month = ("0" + (yesterday.getUTCMonth() + 1)).slice(-2);
    let day = String(yesterday.getDate());
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
