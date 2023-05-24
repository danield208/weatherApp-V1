import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { APIDataService } from "../../_service/api-data.service";
import { CurrentTodayComponent } from "../current-today/current-today.component";
import { ForecastComponent } from "../forecast/forecast.component";
import { CurrentHighlightsComponent } from "../current-highlights/current-highlights.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-infoscreen",
  templateUrl: "./infoscreen.component.html",
  styleUrls: ["./infoscreen.component.scss"],
  standalone: true,
  imports: [
    CurrentTodayComponent,
    ForecastComponent,
    CurrentHighlightsComponent,
    CommonModule,
  ],
})
export class InfoscreenComponent implements OnInit {
  private coordinates!: any;
  public currentData!: any;

  constructor(private route: ActivatedRoute, private data: APIDataService) {}

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.getValues();
    });
  }

  getValues() {
    this.coordinates = this.route.snapshot.paramMap.get("id");
    this.currentData = this.data.loadedWeatherData[this.coordinates];
  }
}
