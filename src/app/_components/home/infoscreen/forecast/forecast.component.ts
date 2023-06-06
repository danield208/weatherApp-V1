import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class ForecastComponent implements OnInit, OnChanges {
  @Input("currentData") public data!: any;

  ngOnInit() {
    this.initModule();
  }

  ngOnChanges(changes: SimpleChanges) {}
  initModule() {}

  getWeekday(date: string): string {
    return "Monday";
  }
}
