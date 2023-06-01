import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { APIDataService } from "../../_service/api-data.service";
import { WeatherAPIService } from "../../_service/weather-api.service";
import { GeolocationService } from "../../_service/geolocation.service";
import { UserService } from "../../_service/user.service";
import { Subscription } from "rxjs";
import { InfoSmallComponent } from "./info-small/info-small.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
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
