import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { WeatherdataModel } from "../../../../_model/weatherdata.model";

@Component({
  selector: "app-current-highlights",
  templateUrl: "./current-highlights.component.html",
  styleUrls: ["./current-highlights.component.scss"],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class CurrentHighlightsComponent implements OnInit {
  @Input("currentData") data!: WeatherdataModel;
  public windDirecDeg: string = "120deg";

  windDirections: any = {
    N: "180deg",
    NNE: "202.5deg",
    NE: "225deg",
    ENE: "274.5deg",
    E: "270deg",
    ESE: "292.5deg",
    SE: "315deg",
    SSE: "337.5deg",
    S: "0deg",
    SSW: "22.5deg",
    SW: "45deg",
    WSW: "67.5deg",
    W: "90deg",
    WNW: "112.5deg",
    NW: "135deg",
    NNW: "157.5deg",
  };

  ngOnInit() {
    this.initModule();
  }

  initModule() {
    this.setCompassDirection();
  }

  setCompassDirection() {
    this.windDirecDeg = this.windDirections[this.data.wind_dir];
  }
}
