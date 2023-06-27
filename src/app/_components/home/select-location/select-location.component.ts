import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { state, trigger, style, transition, animate } from "@angular/animations";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-select-location",
	template: `
		<h1 [@leftRight]="state" (@leftRight.done)="animationDone($event)">
			<mat-icon>west</mat-icon> Select your location
		</h1>
	`,
	styleUrls: ["./select-location.component.scss"],
	animations: [
		trigger("leftRight", [
			state(
				"left",
				style({
					transform: "translateX(0)",
				})
			),
			state(
				"right",
				style({
					transform: "translateX(25px)",
				})
			),
			transition("left <=> right", animate("500ms ease-in-out")),
		]),
	],
})
export class SelectLocationComponent {
	state = "left";

	constructor() {}

	animationDone(event: any) {
		this.state == "left" ? (this.state = "right") : (this.state = "left");
	}
}
