import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { GeolocationService } from "./geolocation.service";
import { APIDataService } from "./api-data.service";

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

  constructor(
    private http: HttpClient,
    private geo: GeolocationService,
    private data: APIDataService
  ) {
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
          this.languages.de +
          ("&dt=" + yesterday)
      );
    } else {
      return this.http.get(
        this.baseURL +
          ("/" + type + ".json") +
          this.API_Key +
          ("&q=" + location) +
          ("&days=" + this.forecast_Days) +
          this.languages.de +
          "&aqi=no&alerts=no"
      );
    }
  }

  // called functions
  getLocationData() {
    let subscription: Subscription = this.getData(
      this.geo.coordinates
    ).subscribe((data) => {
      this.dataModel.coords = data.location.lat + "," + data.location.lon;
      this.dataModel.current = data.current;
      this.dataModel.forecastday = data.forecast.forecastday;
      this.dataModel.location = data.location;
      this.getLocationYesterday();
      subscription.unsubscribe();
    });
  }

  getLocationYesterday() {
    if (this.data.userCities.length > 0) {
      this.getData(this.geo.coordinates, "history", this.yesterday).subscribe(
        (data) => {
          this.dataModel.yesterday = data;
          this.data.locationData = this.dataModel;
          this.getSavedCities();
        }
      );
    } else {
      this.apiLoadFinished.next(true);
    }
  }

  getSavedCities() {
    if (this.data.userCities.length > 0) {
      this.data.userCities.forEach((city) => {
        this.runningTasks.push(
          this.getData(city).subscribe((data) => {
            let coords = data.location.lat + "," + data.location.lon;
            this.getSavedCitiesYesterday(coords, data, city);
          })
        );
      });
    } else {
      this.apiLoadFinished.next(true);
    }
  }

  getSavedCitiesYesterday(coords: string, dataForecast: any, city: string) {
    this.runningTasks.push(
      this.getData(city, "history", this.yesterday).subscribe(
        (dataYesterday) => {
          const dataModel = {
            coords: coords,
            current: dataForecast.current,
            forecastday: dataForecast.forecast.forecastday,
            location: dataForecast.location,
            yesterday: dataYesterday,
          };
          this.data.userCitiesData.push(dataModel);
          if (this.data.userCities.length == this.data.userCitiesData.length)
            this.apiLoadFinished.next(true);
        }
      )
    );
    console.log(this.data.locationData);
    console.log(this.data.userCitiesData);
  }
}
