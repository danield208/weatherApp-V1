import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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
	forecast_Days: number = 4;
	forecastAlerts: string = "&alerts=no";

	locationData: any = [];
	savedCitiesData: any = [];

	// booleans for init
	locationLoaded!: Observable<boolean>;

	constructor(private http: HttpClient) {}

	getData(location: string): Observable<any> {
		console.log("step2");
		// console.log(location);
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

	// getForecast(location: string) {
	// 	let res = this.http.get(
	// 		this.baseURL +
	// 			"/forecast.json" +
	// 			this.API_Key +
	// 			"&q=" +
	// 			location +
	// 			"&days=" +
	// 			this.forecast_Days +
	// 			this.languages.de +
	// 			"&aqi=no&alerts=no"
	// 	);
	// }
}
