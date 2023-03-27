import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class WeatherAPIService {
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

	locationData: any = [];
	savedCitiesData: any = [];

	// booleans for init
	apiLoadFinished!: BehaviorSubject<boolean>;

	yesterday!: any;

	constructor(private http: HttpClient) {
		this.apiLoadFinished = new BehaviorSubject<boolean>(false);
		this.getYesterday();
	}

	getYesterday() {
		let current = new Date();
		let yesterday = new Date(current.getTime());
		yesterday.setDate(current.getDate() - 1);
		let year = String(yesterday.getFullYear());
		let month = ("0" + (yesterday.getUTCMonth() + 1)).slice(-2);
		let day = String(yesterday.getDate());
		this.yesterday = year + "-" + month + "-" + day;
	}

	getData(location: string): Observable<any> {
		return this.http.get(
			this.baseURL +
				"/forecast.json" +
				this.API_Key +
				"&q=" +
				location +
				"&days=" +
				this.forecast_Days +
				this.languages.de +
				"&aqi=no&alerts=no"
		);
	}
}
