import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-current-today",
  templateUrl: "./current-today.component.html",
  styleUrls: ["./current-today.component.scss"],
})
export class CurrentTodayComponent implements OnInit {
  @Input("currentData") public data!: any;
  public imgIconCondition!: string;

  public conditionIcon!: string;
  public conditionText!: string;
  public temp!: number;
  public locationName!: string;
  public date!: any;
  public code!: number;

  ngOnInit() {
    this.setValues();
    this.setImgCondition();
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
}
