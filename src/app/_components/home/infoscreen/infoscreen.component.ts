import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { APIDataService } from "../../../_service/api-data.service";
import { CurrentTodayComponent } from "./current-today/current-today.component";
import { ForecastComponent } from "./forecast/forecast.component";
import { CurrentHighlightsComponent } from "./current-highlights/current-highlights.component";
import { CommonModule } from "@angular/common";
import { GoogleMapsApiService } from "../../../_service/google-maps-api.service";

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

  imageToShow!: any;
  isImageLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private data: APIDataService,
    private places: GoogleMapsApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.getValues();
      this.places
        .googleFindPlace(this.currentData.location.name.replace(" ", "%20"))
        .subscribe((resolve) => {
          this.isImageLoading = true;
          this.places
            .googleGetPicture(resolve.candidates[0].photos[0].photo_reference)
            .subscribe(
              (data) => {
                this.createImageFromBlob(data);
                this.isImageLoading = false;
              },
              (error) => {
                this.isImageLoading = false;
                console.error(error);
              }
            );
        });
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        return (this.imageToShow = reader.result);
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getValues() {
    this.coordinates = this.route.snapshot.paramMap.get("id");
    this.currentData = this.data.loadedWeatherData[this.coordinates];
  }
}
