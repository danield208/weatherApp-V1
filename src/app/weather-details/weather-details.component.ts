import { Component } from "@angular/core";

@Component({
	selector: "app-weather-details",
	templateUrl: "./weather-details.component.html",
	styleUrls: ["./weather-details.component.scss"],
})
export class WeatherDetailsComponent {
	title = "Wetter";

	coordinates!: any;

	openMenu: boolean = false;
	dayOfMonth: string = ("0" + new Date().getDate().toString()).slice(-2);

	currentData: any;
	currentLocation: any;

	locationName!: string;

	overview: any = {
		conditionIcon: "",
		conditionText: "",
		day: "",
		currentTime: "",
		temp_c: 0,
		feelslike_c: 0,
	};

	info: any = {
		wind_kph: 0,
		daily_chance_of_rain: 0,
		uvIndex: 0,
		wind_dir: "",
	};

	yesterday!: any;

	test!: any;

	constructor() {}

	ngOnInit(): void {
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

	// async loadWeatherApi() {
	// 	let response = await fetch(this.api_call);
	// 	let responseJSON = await response.json();
	// 	this.currentData = responseJSON.current;
	// 	this.currentLocation = responseJSON.location;
	// 	this.setValues();
	// }

	// setValues() {
	// 	this.locationName = this.currentLocation.name;
	// 	this.overview.conditionIcon = this.currentData.condition.icon;
	// 	this.overview.conditionText = this.currentData.condition.text;
	// 	this.overview.temp_c = this.currentData.temp_c;
	// 	this.overview.feelslike_c = this.currentData.feelslike_c;
	// 	this.info.wind_kph = this.currentData.wind_kph;
	// 	this.info.uvIndex = this.currentData.uv;
	// 	this.info.wind_dir = this.currentData.wind_dir;

	// 	var a = new Date();
	// 	var weekdays = new Array(7);
	// 	weekdays[0] = "Sunday";
	// 	weekdays[1] = "Monday";
	// 	weekdays[2] = "Tuesday";
	// 	weekdays[3] = "Wednesday";
	// 	weekdays[4] = "Thursday";
	// 	weekdays[5] = "Friday";
	// 	weekdays[6] = "Saturday";
	// 	var r = weekdays[a.getDay()];
	// 	this.overview.day = r;

	// 	this.overview.currentTime = this.setCurrentTime(this.currentLocation.localtime.split(" "));
	// }

	// setCurrentTime(data: any, forForecast: boolean = false) {
	// 	let date = data;
	// 	date = date[0].split("-");
	// 	if (forForecast) return date[2] + "." + date[1];
	// 	else return date[2] + "." + date[1] + "." + date[0];
	// 	// this.overview.currentTime = date[2] + '.' + date[1] + '.' + date[0];
	// }
}