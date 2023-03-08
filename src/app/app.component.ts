import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weatherApp-V1';

  api_key: string = 'cce16babc3924c04bcb130127230703';
  coordinates: string = 'Berlin';
  api_call: string = `https://api.weatherapi.com/v1/current.json?key=${this.api_key}&q=${this.coordinates}&aqi=no`;

  forecastDays: number = 4;

  testApiCallForecast: string = `https://api.weatherapi.com/v1/forecast.json?key=cce16babc3924c04bcb130127230703&q=Berlin&days=${this.forecastDays}&aqi=no&alerts=no`;
  testApiCallHistoryForForecast: string =
    'https://api.weatherapi.com/v1/history.json?key=cce16babc3924c04bcb130127230703&q=Berlin&dt=2023-03-07';

  openMenu: boolean = false;

  currentData: any;
  currentLocation: any;

  locationName!: string;

  overview: any = {
    conditionIcon: '',
    conditionText: '',
    currentTime: '',
    temp_c: 0,
    feelslike_c: 0,
  };

  info: any = {
    wind_kph: 0,
    uvIndex: 0,
    wind_dir: '',
  };

  forecastArray: any[] = [];

  ngOnInit() {
    this.getPosition();
    this.loadWeatherApi();
    this.loadforecastapi2();
  }

  async loadforecastapi2() {
    let response = await fetch(this.testApiCallHistoryForForecast);
    let responseJSON = await response.json();
    let history = responseJSON.forecast.forecastday[0];

    console.log(responseJSON);

    let forecast: any = {
      day: '#',
      date: this.setCurrentTime(history.date.split(' '), true),
      conditionIcon: history.day.condition.icon,
      maxTemp_c: history.day.maxtemp_c,
      chanceOfRain: history.day.daily_chance_of_rain,
    };

    this.forecastArray.unshift(forecast);

    this.loadforecastapi();
  }

  async loadforecastapi() {
    let response = await fetch(this.testApiCallForecast);
    let responseJSON = await response.json();

    responseJSON.forecast.forecastday.forEach((currentDay: any) => {
      let forecast: any = {
        day: '#',
        date: this.setCurrentTime(currentDay.date.split(' '), true),
        conditionIcon: currentDay.day.condition.icon,
        maxTemp_c: currentDay.day.maxtemp_c,
        chanceOfRain: currentDay.day.daily_chance_of_rain,
      };

      this.forecastArray.push(forecast);
    });

    console.log(this.forecastArray);
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          this.successCallback({
            lng: resp.coords.longitude,
            lat: resp.coords.latitude,
          });
        },
        (err) => {
          this.errorCallback(err);
        }
      );
    });
  }

  successCallback(position: any) {
    this.coordinates = `${position.lat},${position.lng}`;
    this.setApiCall();
  }

  errorCallback(error: any) {
    console.log(error);
  }

  setApiCall() {
    this.api_call = `https://api.weatherapi.com/v1/current.json?key=${this.api_key}&q=${this.coordinates}&aqi=no`;
    this.loadWeatherApi();
  }

  async loadWeatherApi() {
    let response = await fetch(this.api_call);
    let responseJSON = await response.json();
    this.currentData = responseJSON.current;
    this.currentLocation = responseJSON.location;
    this.setValues();
  }

  setValues() {
    this.locationName = this.currentLocation.name;
    this.overview.conditionIcon = this.currentData.condition.icon;
    this.overview.conditionText = this.currentData.condition.text;
    this.overview.temp_c = this.currentData.temp_c;
    this.overview.feelslike_c = this.currentData.feelslike_c;
    this.info.wind_kph = this.currentData.wind_kph;
    this.info.uvIndex = this.currentData.uv;
    this.info.wind_dir = this.currentData.wind_dir;

    this.overview.currentTime = this.setCurrentTime(
      this.currentLocation.localtime.split(' ')
    );
  }

  setCurrentTime(data: any, forForecast: boolean = false) {
    let date = data;
    date = date[0].split('-');
    if (forForecast) return date[2] + '.' + date[1];
    else return date[2] + '.' + date[1] + '.' + date[0];
    // this.overview.currentTime = date[2] + '.' + date[1] + '.' + date[0];
  }
}
