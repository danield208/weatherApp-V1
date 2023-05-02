import { Component, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { APIDataService } from "../_service/api-data.service";
import { WeatherAPIService } from "../_service/weather-api.service";

@Component({
	selector: "app-weather-details",
	templateUrl: "./weather-details.component.html",
	styleUrls: ["./weather-details.component.scss"],
})
export class WeatherDetailsComponent {
	selectedCity!: string;
	apiReady: boolean = false;

	dayOfMonth: string = ("0" + new Date().getDate().toString()).slice(-2);
	currentData: any;
	currentLocation: any;
	locationName!: string;

	weekdays: Array<string> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

	@Output() forecastArray: any = [];

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

	constructor(private api: WeatherAPIService, private data: APIDataService, private route: ActivatedRoute) {}

	setData() {
		this.route.params.subscribe((params) => {
			let selectedCity = params["id"];
			if (this.checkIfDetailsForLocation(selectedCity)) {
				this.setValues(this.data.locationData);
			} else {
				this.data.userCitiesData.forEach((location) => {
					if (location.coords == selectedCity) {
						this.setValues(location);
					}
				});
			}
		});
	}

	checkIfDetailsForLocation(selectedCity: string) {
		return this.data.locationData.coords == selectedCity;
	}

	setValues(data: any) {
		console.log(data);
		// this.locationName = this.data.location;
		this.locationName = data.location.name;
		this.overviewdata.conditionIcon = data.current.condition.icon;
		this.overviewdata.conditionText = data.current.condition.text;
		this.overviewdata.temp_c = data.current.temp_c;
		this.overviewdata.feelslike_c = data.current.feelslike_c;
		this.infodata.wind_kph = data.current.wind_kph;
		this.infodata.uvIndex = data.current.uv;
		this.infodata.wind_dir = data.current.wind_dir;

		let a = new Date();
		let r = this.weekdays[a.getDay()];
		this.overviewdata.day = r;

		let date = this.setCurrentTime(data.yesterday.location.localtime.split(" ")[0], true);
		let day = data.yesterday.forecast.forecastday[0];
		this.forecastArray.push({ date, day });

		data.forecastday.forEach((day: any) => {
			let date = this.setCurrentTime(day.date, true);
			this.forecastArray.push({ date, day });
		});

		this.overviewdata.currentTime = this.setCurrentTime(data.location.localtime.split(" ")[0]);
	}

	setCurrentTime(data: string, forForecast: boolean = false) {
		this.apiReady = true;
		let date = data.split("-");
		if (forForecast) return date[2] + "." + date[1];
		else return date[2] + "." + date[1] + "." + date[0];
	}
}
