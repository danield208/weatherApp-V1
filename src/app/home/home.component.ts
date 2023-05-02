import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { APIDataService } from "../_service/api-data.service";
import { WeatherAPIService } from "../_service/weather-api.service";

@Component({
  selector: "app-home",
  template: `
    <mat-drawer-container autosize>
      <mat-drawer #drawer mode="side" opened>
        <h1>Wetter</h1>
        <app-location></app-location>
        <hr />
        <p>Gespeicherte Orte:</p>
        <input placeholder="Ort Hinzufügen" />
        <content *ngIf="apiLoaded">
          <app-city *ngFor="let city of citiesData" [data]="city"></app-city>
        </content>
      </mat-drawer>

      <mat-drawer-content>
        <button class="toggleBTN" mat-raised-button (click)="drawer.toggle()">
          Sidenav
        </button>
        <button class="logoutBTN" mat-raised-button (click)="logout()">
          LogOut
        </button>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  apiLoaded!: boolean;
  citiesData!: Array<any>;
  checkAPILoad!: any;
  location!: any;
  showSidenav: boolean = true;

  constructor(
    private api: WeatherAPIService,
    private data: APIDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initComponent();
    if (window.innerWidth < 1200) this.showSidenav = false;
  }

  initComponent() {
    this.checkAPILoad = this.api.apiLoadFinished.subscribe((status) => {
      if (status) {
        this.citiesData = this.data.userCitiesData;
        this.apiLoaded = true;
      } else {
        this.apiLoaded = false;
      }
    });
  }

  logout() {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      this.router.navigateByUrl("/start");
    } else this.router.navigateByUrl("/start");
  }
}
