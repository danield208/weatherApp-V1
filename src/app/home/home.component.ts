import { Component } from "@angular/core";

@Component({
	selector: "app-home",
	template: `
		<span>Menu</span>
		<h1>Wetter</h1>
		<app-location routerLink="/location"></app-location>
		<hr />
		<input placeholder="Ort Hinzufügen" />
		<content>
			<p>Gespeicherte Orte</p>
			<app-city></app-city>
		</content>
	`,
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
	constructor() {}
}
