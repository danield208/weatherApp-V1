import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { APIDataService } from "../_service/api-data.service";
import { WeatherAPIService } from "../_service/weather-api.service";
import { GeolocationService } from "../_service/geolocation.service";
import { UserService } from "../_service/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  template: `
    <mat-drawer-container autosize *ngIf="userLoaded">
      <mat-drawer #drawer mode="side" opened>
        <h1>Weather</h1>
        <app-info-small
          *ngIf="geoLoaded"
          [location]="geo.coordinates"
        ></app-info-small>
        <br />
        <p>Saved locations:</p>
        <app-save-city-form></app-save-city-form>
        <span>Saved cities</span>

        <app-info-small
          *ngFor="let city of user.User.savedcities"
          [location]="city"
        ></app-info-small>
      </mat-drawer>

      <mat-drawer-content>
        <button mat-icon-button class="toggleBTN" (click)="drawer.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <button mat-icon-button class="logoutBTN" (click)="logout()">
          <mat-icon>logout</mat-icon>
        </button>
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  location!: any;
  showSidenav: boolean = true;
  userLoaded: boolean = false;
  geoLoaded: boolean = false;
  geoSubscription!: Subscription;

  constructor(
    private api: WeatherAPIService,
    private data: APIDataService,
    private router: Router,
    public geo: GeolocationService,
    public user: UserService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth < 1200) this.showSidenav = false;

    this.user.userInitCompleted.subscribe((resp: boolean): void => {
      if (resp) {
        this.userLoaded = true;
      }
    });

    this.geoSubscription = this.geo.locationLoaded.subscribe(
      (response: boolean): void => {
        if (response) this.geoLoaded = true;
      }
    );
  }

  logout() {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      this.router.navigateByUrl("/start");
    } else this.router.navigateByUrl("/start");
  }
}
