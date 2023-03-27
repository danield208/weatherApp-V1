import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-forecast-day",
	template: `
		<p>{{ day }}</p>
		<p>{{ data.date }}</p>
		<img src="{{ data.conditionIcon }}" />
		<p>{{ data.maxTemp_c }}&#176;</p>
		<p *ngIf="data.chanceOfRain != undefined">{{ data.chanceOfRain }}&#37;</p>
	`,
	styles: [],
})
export class ForecastDayComponent implements OnInit {
	@Input() data!: any;
	day!: string;

	constructor() {}

	ngOnInit(): void {
		var a = new Date(this.data.date);
		var weekdays = new Array(7);
		weekdays[0] = "Sunday";
		weekdays[1] = "Monday";
		weekdays[2] = "Tuesday";
		weekdays[3] = "Wednesday";
		weekdays[4] = "Thursday";
		weekdays[5] = "Friday";
		weekdays[6] = "Saturday";
		this.day = weekdays[a.getDay()].slice(0, 2);
	}
}
