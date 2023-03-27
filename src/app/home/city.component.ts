import { Component } from "@angular/core";

@Component({
	selector: "app-city",
	template: `
		<div class="top">
			<div>
				<span>Mannheim</span>
				<span>13:20</span>
			</div>
			<span>8&#176;</span>
		</div>
		<div class="bottom">
			<span>Nieselregen</span>
			<span>H: 10&#176; | T: 5&#176;</span>
		</div>
	`,
	styleUrls: ["city&location.component.scss"],
})
export class CityComponent {}
