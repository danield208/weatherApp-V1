import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class ForecastComponent implements OnInit {
  @Input("currentData") public data!: any;

  ngOnInit() {
    this.initModule();
  }
  initModule() {}

  getWeekday(date: string): string {
    return "Monday";
  }
}
