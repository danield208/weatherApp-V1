import { Component, Output } from "@angular/core";
import { APIDataService } from "../_service/api-data.service";
import { WeatherAPIService } from "../_service/weather-api.service";

@Component({
	selector: "app-weather-details",
	template: `
		<content>
			<header routerLink="/home">
				<img src="./assets/images/platzhalter.png" />
				<h2>{{ locationName }}</h2>
			</header>
			<app-overview [overview]="overviewdata" class="content-padding"></app-overview>
			<app-info [info]="infodata" class="content-padding"></app-info>
			<!-- <app-forecast [forecast]="forecastArray" class="content-padding"></app-forecast> -->
		</content>
	`,
	styleUrls: ["./weather-details.component.scss"],
})
export class WeatherDetailsComponent {
	dayOfMonth: string = ("0" + new Date().getDate().toString()).slice(-2);

	currentData: any;
	currentLocation: any;

	locationName!: string;

	@Output() overviewdata: any = {
		conditionIcon: "",
		conditionText: "",
		day: "",
		currentTime: "",
		temp_c: 0,
		feelslike_c: 0,
	};

	@Output() infodata: any = {
		wind_kph: 0,
		daily_chance_of_rain: 0,
		uvIndex: 0,
		wind_dir: "",
	};

	// ##################################################################################
	// ##################################################################################
	// ##################################################################################

	loadedData: any = {
		current: {},
		forecastday: {},
		location: {},
	};

	checkAPILoad = this.api.apiLoadFinished.subscribe((status) => {
		if (status) {
			this.setData();
		}
	});

	constructor(private api: WeatherAPIService, private data: APIDataService) {}

	setData() {
		this.setValues(this.data);
	}

	setValues(data: any) {
		// this.locationName = this.data.location;
		this.locationName = data.location.location.name;
		this.overviewdata.conditionIcon = data.location.current.condition.icon;
		this.overviewdata.conditionText = data.location.current.condition.text;
		this.overviewdata.temp_c = data.location.current.temp_c;
		this.overviewdata.feelslike_c = data.location.current.feelslike_c;
		this.infodata.wind_kph = data.location.current.wind_kph;
		this.infodata.uvIndex = data.location.current.uv;
		this.infodata.wind_dir = data.location.current.wind_dir;

		var a = new Date();
		var weekdays = new Array(7);
		weekdays[0] = "Sunday";
		weekdays[1] = "Monday";
		weekdays[2] = "Tuesday";
		weekdays[3] = "Wednesday";
		weekdays[4] = "Thursday";
		weekdays[5] = "Friday";
		weekdays[6] = "Saturday";
		var r = weekdays[a.getDay()];
		this.overviewdata.day = r;

		this.overviewdata.currentTime = this.setCurrentTime(data.location.location.localtime.split(" ")[0]);
	}

	setCurrentTime(data: string, forForecast: boolean = false) {
		let date = data.split("-");
		if (forForecast) return date[2] + "." + date[1];
		else return date[2] + "." + date[1] + "." + date[0];
	}

	// getPosition(): Promise<any> {
	// 	return new Promise((resolve, reject) => {
	// 		navigator.geolocation.getCurrentPosition(
	// 			(resp) => {
	// 				this.successCallback({
	// 					lng: resp.coords.longitude,
	// 					lat: resp.coords.latitude,
	// 				});
	// 			},
	// 			(err) => {
	// 				this.errorCallback(err);
	// 			}
	// 		);
	// 	});
	// }

	// successCallback(position: any) {
	// 	this.coordinates = `${position.lat},${position.lng}`;
	// }

	// errorCallback(error: any) {
	// 	console.log(error);
	// }

	// async loadforecastapi2() {
	// 	let response = await fetch(this.testApiCallHistoryForForecast);
	// 	let responseJSON = await response.json();
	// 	let history = responseJSON.forecast.forecastday[0];

	// 	var a = new Date(history.date);

	// 	var r = this.weekdays[a.getDay()].slice(0, 2);

	// 	let forecast: any = {
	// 		day: r,
	// 		date: this.setCurrentTime(history.date.split(" "), true),
	// 		conditionIcon: history.day.condition.icon,
	// 		maxTemp_c: history.day.maxtemp_c,
	// 		chanceOfRain: history.day.daily_chance_of_rain,
	// 	};

	// 	this.forecastArray.unshift(forecast);
	// 	console.log(this.yesterday);
	// }

	// async loadforecastapi() {
	// 	let response = await fetch(this.testApiCallForecast);
	// 	let responseJSON = await response.json();

	// 	responseJSON.forecast.forecastday.forEach((currentDay: any) => {
	// 		var a = new Date(currentDay.date);
	// 		var weekdays = new Array(7);
	// 		weekdays[0] = "Sunday";
	// 		weekdays[1] = "Monday";
	// 		weekdays[2] = "Tuesday";
	// 		weekdays[3] = "Wednesday";
	// 		weekdays[4] = "Thursday";
	// 		weekdays[5] = "Friday";
	// 		weekdays[6] = "Saturday";
	// 		var r = weekdays[a.getDay()].slice(0, 2);

	// 		let forecast: any = {
	// 			day: r,
	// 			date: this.setCurrentTime(currentDay.date.split(" "), true),
	// 			conditionIcon: currentDay.day.condition.icon,
	// 			maxTemp_c: currentDay.day.maxtemp_c,
	// 			chanceOfRain: currentDay.day.daily_chance_of_rain,
	// 		};

	// 		let dateOfDay = this.setCurrentTime(currentDay.date.split(" "), true).split(".")[0];

	// 		if (dateOfDay == this.dayOfMonth) this.info.daily_chance_of_rain = currentDay.day.daily_chance_of_rain;

	// 		this.forecastArray.push(forecast);
	// 	});
	// }

	// setApiCall() {
	// 	this.api_call = `https://api.weatherapi.com/v1/current.json?key=${this.api_key}&q=${this.coordinates}&aqi=no`;
	// 	this.loadWeatherApi();
	// }
}
