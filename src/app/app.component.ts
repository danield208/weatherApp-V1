import { Component } from "@angular/core";
import { APIDataService } from "./_service/api-data.service";
import { GeolocationService } from "./_service/geolocation.service";
import { WeatherAPIService } from "./_service/weather-api.service";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
  styles: [],
})
export class AppComponent {
  location!: any;
  checkLoadedLoc!: any;

  constructor(
    private geo: GeolocationService,
    private api: WeatherAPIService,
    private data: APIDataService
  ) {
    this.data.UserLoadedAndAuthenticated$.subscribe((status) => {
      if (status) {
        this.initApp();
      }
    });
  }

  initApp() {
    this.location = this.geo.locations.subscribe(() => {
      this.location.unsubscribe();
    });

    this.checkLoadedLoc = this.geo.locationLoaded.subscribe((status) => {
      if (status) {
        if (!this.geo.locationError) {
          this.api.getLocationData();
        } else if (this.data.userCities.length > 0) {
          this.api.getSavedCities();
        }
      }
    });
  }
}
