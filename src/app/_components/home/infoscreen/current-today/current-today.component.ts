import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-current-today",
  templateUrl: "./current-today.component.html",
  styleUrls: ["./current-today.component.scss"],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
})
export class CurrentTodayComponent implements OnInit, OnChanges {
  @Input("currentData") public data!: any;
  public imgIconCondition!: string;
  public imgLoading!: boolean;
  public conditionIcon!: string;
  public conditionText!: string;
  public temp!: number;
  public locationName!: string;
  public date!: any;
  public code!: number;

  ngOnInit() {
    this.imgLoading = true;
    this.initModule();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.imgLoading = true;
    this.initModule();
  }

  initModule() {
    this.setValues();
    this.setImgCondition();
    this.setDate();
    this.imgLoading = false;
  }

  setValues() {
    this.conditionIcon = this.data ? this.data.condition.icon : "err";
    this.conditionText = this.data ? this.data.condition.text : "err";
    this.temp = this.data ? this.data.temp_c : "err";
    this.locationName = this.data ? this.data.location.name : "err";
    this.date = this.data
      ? new Date(this.data.location.localtime * 1000)
      : "err";
    this.code = this.data ? this.data.condition.code : "err";
  }

  setImgCondition() {
    this.imgIconCondition =
      "./assets/images/weathercondition/" + this.code + ".png";
  }

  setDate() {
    this.date =
      this.date.getDay() + this.date.getMonth() + (this.date.getYear() + 1);
  }
}
