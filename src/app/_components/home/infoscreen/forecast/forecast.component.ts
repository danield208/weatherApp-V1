import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.scss"],
})
export class ForecastComponent implements OnInit {
  @Input("currentData") public data!: any;

  weekdays: Array<string> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  ngOnInit() {
    this.data.forEach((elem: any) => {
      const getDate = elem.date.replace(/-/g, ", ");
      const weekIndex = new Date(getDate).getDay() - 1;
      elem.weekday = this.weekdays[weekIndex];
    });
  }
}
