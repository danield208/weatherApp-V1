import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { WeatherAPIService } from "../../../_service/weather-api.service";
import { WeatherdataModel } from "../../../_model/weatherdata.model";
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { APIDataService } from "../../../_service/api-data.service";

@Component({
  selector: "app-info-small",
  template: `
    <mat-card>
      <mat-card-content *ngIf="weatherData" (click)="openDetails()">
        <div class="top">
          <div>
            <span>{{ weatherData.location.name }}</span>
            <span>{{ rxTime | date : "dd.MM. HH:mm" }}</span>
          </div>
          <span>{{ weatherData.temp_c }}&#176;</span>
        </div>
        <div class="bottom">
          <span>{{ weatherData.condition.text }}</span>
          <span
            >H: {{ weatherData.forecastday[0].day.maxtemp_c }}&#176; | T:
            {{ weatherData.forecastday[0].day.mintemp_c }}&#176;</span
          >
        </div>
      </mat-card-content>

      <mat-card-footer>
        <mat-progress-bar
          *ngIf="showLoader"
          mode="indeterminate"
        ></mat-progress-bar>
      </mat-card-footer>
    </mat-card>
  `,
  styleUrls: ["info-small.component.scss"],
  providers: [WeatherAPIService],
})
export class InfoSmallComponent implements OnInit, OnDestroy {
  @Input() location!: string;
  weatherData!: WeatherdataModel;
  rxTime: Date = new Date();
  subscription!: Subscription;
  showLoader: boolean = true;

  constructor(
    private api: WeatherAPIService,
    private router: Router,
    private route: ActivatedRoute,
    private data: APIDataService
  ) {}

  ngOnInit(): void {
    this.getApiData();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openDetails() {
    this.router.navigate([this.location], { relativeTo: this.route });
  }

  getApiData(): void {
    this.showLoader = true;
    this.api.getData(this.location).subscribe((result): void => {
      this.weatherData = new WeatherdataModel(result);
      this.api.getData(this.location, "history").subscribe((result) => {
        this.weatherData.yesterday = result.forecast.forecastday[0];
        this.data.loadedWeatherData[this.location] = this.weatherData;
        this.showLoader = false;
      });
      this.setTime();
    });
  }

  setTime(): void {
    let dataTime = new Date(this.weatherData.location.localtime * 1000);
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date(dataTime)),
        share()
      )
      .subscribe((time) => {
        dataTime.setSeconds(dataTime.getSeconds() + 1);
        this.rxTime = time;
      });
  }
}
