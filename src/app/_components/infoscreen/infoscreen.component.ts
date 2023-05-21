import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { APIDataService } from "../../_service/api-data.service";

@Component({
  selector: "app-infoscreen",
  templateUrl: "./infoscreen.component.html",
  styleUrls: ["./infoscreen.component.scss"],
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
