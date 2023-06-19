import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ElementRef,
  AfterViewInit,
  ViewChild,
} from "@angular/core";
import { WeatherAPIService } from "../../../_service/weather-api.service";
import { WeatherdataModel } from "../../../_model/weatherdata.model";
import { filter, Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { SavedWeatherDataService } from "../../../_service/savedWeatherData.service";

@Component({
  selector: "app-info-small",
  template: `
    <mat-card #matCard matRipple [matRippleUnbounded]="false">
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
export class InfoSmallComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() location!: string;
  @ViewChild("matCard", { read: ElementRef }) matCard!: ElementRef;
  weatherData!: WeatherdataModel;
  rxTime: Date = new Date();
  subscription!: Subscription;
  showLoader: boolean = true;

  constructor(
    private api: WeatherAPIService,
    private router: Router,
    private route: ActivatedRoute,
    private savedData: SavedWeatherDataService
  ) {}

  ngOnInit(): void {
    this.getApiData();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.rootRoute(this.route)),
        filter((route: ActivatedRoute) => route.outlet === "primary")
      )
      .subscribe((route: ActivatedRoute) => {
        if (route.snapshot.paramMap.get("id") == this.location)
          this.matCard.nativeElement.style.backgroundColor = "#595959";
        else this.matCard.nativeElement.style.backgroundColor = "#424242";
      });
  }
  rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  getApiData(): void {
    this.showLoader = true;
    this.api.getData(this.location).subscribe((result): void => {
      this.weatherData = new WeatherdataModel(result);
      this.api.getData(this.location, "history").subscribe((result) => {
        this.weatherData.yesterday = result.forecast.forecastday[0];
        this.savedData.savedWeatherData[this.location] = this.weatherData;
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

  openDetails() {
    if (this.router.url.split("/").length > 2) {
      this.router.navigate(["/home/info"]);
      setTimeout(() => {
        this.router.navigate(["info/" + this.location], {
          relativeTo: this.route,
        });
      }, 125);
    } else {
      this.router.navigate(["info/" + this.location], {
        relativeTo: this.route,
      });
    }
  }
}
