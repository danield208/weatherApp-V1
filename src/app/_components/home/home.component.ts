import { Component, Renderer2, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterEvent, Event } from "@angular/router";
import { APIDataService } from "../../_service/api-data.service";
import { WeatherAPIService } from "../../_service/weather-api.service";
import { GeolocationService } from "../../_service/geolocation.service";
import { UserService } from "../../_service/user.service";
import { Subscription, filter } from "rxjs";
import { DatabaseService } from "../../_service/database.service";

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
  routeInArray: Array<string> = [];
  routeID!: string | undefined;
  routeIdInCitiesArray!: boolean;

  constructor(
    private api: WeatherAPIService,
    private data: APIDataService,
    public router: Router,
    private route: ActivatedRoute,
    public geo: GeolocationService,
    public user: UserService,
    private rd2: Renderer2,
    private database: DatabaseService
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
    this.router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof RouterEvent))
      .subscribe((res) => {
        this.routeInArray = res.url.split("/");
        this.routeID = this.routeInArray.at(-1);
        if (this.user.User.savedcities.includes(this.routeID)) {
          this.routeIdInCitiesArray = true;
        } else this.routeIdInCitiesArray = false;
      });
  }

  renderListeners() {
    this.rd2.listen("window", "resize", () => {
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

  deleteItem() {
    let index = -1;
    this.user.User.savedcities.forEach((city: any) => {
      index++;
      if (city == this.routeID) {
        this.user.User.savedcities.splice(index, 1);
      }
    });
    this.database
      .updateSavedCities({ savedcities: this.user.User.savedcities })
      .subscribe((res: any) => {
        // console.log(res);
      });
  }
}
