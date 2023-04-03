import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-city",
	template: `
		<div class="top" (click)="showDetails()">
			<div>
				<span>{{ data.location.name }}</span>
				<span>{{ data.location.localtime.split(" ")[1] }}</span>
			</div>
			<span>{{ data.current.temp_c }}&#176;</span>
		</div>
		<div class="bottom" (click)="showDetails()">
			<span>{{ data.current.condition.text }}</span>
			<span>H: {{ data.forecastday[0].day.maxtemp_c }}&#176; | T: {{ data.forecastday[0].day.mintemp_c }}&#176;</span>
		</div>
	`,
	styleUrls: ["city&location.component.scss"],
})
export class CityComponent {
	@Input() data: any;

	constructor(private router: Router) {}

	showDetails() {
		this.router.navigateByUrl("/details/" + this.data.location.lat + "," + this.data.location.lon);
	}
}
