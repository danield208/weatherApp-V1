import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-forecast-day",
	template: `
		<p>{{ day }}</p>
		<p>{{ data.date }}</p>
		<img src="{{ data.day.day.condition.icon }}" />
		<p>{{ data.day.day.maxtemp_c }}&#176;</p>
		<p *ngIf="data.day.day.daily_chance_of_rain != undefined">{{ data.day.day.daily_chance_of_rain }}&#37;</p>
	`,
	styles: [],
})
export class ForecastDayComponent implements OnInit {
	@Input() data!: any;
	day!: string;

	constructor() {}

	ngOnInit(): void {
		var a = new Date(this.data.day.date);
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
