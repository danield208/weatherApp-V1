import { Component, Input, OnInit } from "@angular/core";
import { APIDataService } from "src/app/_service/api-data.service";

@Component({
	selector: "app-overview",
	template: `
		<img src="{{ overview.conditionIcon }}" />
		<div class="appOverview-dateAndText">
			<p>{{ overview.conditionText }}</p>
			<p>{{ overview.day }}</p>
			<p>{{ overview.currentTime }}</p>
		</div>
		<div class="appOverview-temperature">
			<p>{{ overview.temp_c }}&#176;</p>
			<p>Feels like:</p>
			<p>{{ overview.feelslike_c }}&#176;</p>
		</div>
	`,
	styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
	@Input() overview: any;

	constructor(public data: APIDataService) {}

	ngOnInit(): void {
		console.log(this.overview);
	}
}
