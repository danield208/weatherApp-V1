import { Component, Renderer2, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { APIDataService } from "../../_service/api-data.service";
import { WeatherAPIService } from "../../_service/weather-api.service";
import { GeolocationService } from "../../_service/geolocation.service";
import { UserService } from "../../_service/user.service";
import { Subscription } from "rxjs";

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
  mobileMode: boolean = false;

  constructor(
    private api: WeatherAPIService,
    private data: APIDataService,
    private router: Router,
    private route: ActivatedRoute,
    public geo: GeolocationService,
    public user: UserService,
    private rd2: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderListeners();
    this.checkForMobileWidth();
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

  renderListeners() {
    this.rd2.listen("window", "resize", (event) => {
      this.checkForMobileWidth();
    });
  }

  checkForMobileWidth() {
    window.innerWidth < 1200 ? (this.showSidenav = false) : true;
  }

  logout() {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      this.router.navigateByUrl("/start");
    } else this.router.navigateByUrl("/start");
  }

  showUserScreen() {
    this.router.navigate(["user"], { relativeTo: this.route });
  }
}
