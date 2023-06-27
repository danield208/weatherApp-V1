import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GoogleMapsApiService } from "../../../_service/google-maps-api.service";
import { WeatherAPIService } from "../../../_service/weather-api.service";
import { SavedWeatherDataService } from "../../../_service/savedWeatherData.service";

@Component({
	selector: "app-infoscreen",
	templateUrl: "./infoscreen.component.html",
	styleUrls: ["./infoscreen.component.scss"],
})
export class InfoscreenComponent implements OnInit {
	private coordinates!: any;
	public currentData!: any;

	//google places
	public imageToShow!: string;
	public isImageLoading: boolean = true;

	constructor(
		private route: ActivatedRoute,
		private places: GoogleMapsApiService,
		private api: WeatherAPIService,
		private savedData: SavedWeatherDataService,
		private gmAPI: GoogleMapsApiService
	) {}

	ngOnInit() {
		this.route.params.subscribe(() => {
			this.getValues();
			//this.loadGpImage();
			this.isImageLoading = false;
		});
	}

	getValues() {
		this.coordinates = this.route.snapshot.paramMap.get("id");
		this.currentData = this.savedData.savedWeatherData[this.coordinates];
	}

	loadGpImage() {
		const locationname = this.currentData.location.name.replace(" ", "%20");
		this.isImageLoading = true;
		if (this.currentData.locationImg) {
			this.imageToShow = this.currentData.locationImg;
			this.isImageLoading = false;
		} else this.loadNewImg(locationname);
	}

	loadNewImg(local: string) {
		this.gmAPI.googlePlaces(local).subscribe(
			(data) => {
				this.gmAPI.createImageFromBlob(data).then((res) => {
					this.currentData.locationImg = res;
					this.imageToShow = res;
					this.isImageLoading = false;
				});
			},
			(error) => {
				console.error(error);
			}
		);
	}
}
