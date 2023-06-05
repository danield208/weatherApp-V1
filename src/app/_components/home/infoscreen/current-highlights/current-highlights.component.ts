import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-current-highlights",
  templateUrl: "./current-highlights.component.html",
  styleUrls: ["./current-highlights.component.scss"],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class CurrentHighlightsComponent implements OnInit, OnChanges {
  @Input("currentData") data!: any;
  public windDirecDeg: string = "120deg";

  windDirections: any = {
    N: "0deg",
    NNE: "22.5deg",
    NE: "45deg",
    ENE: "67.5deg",
    E: "90deg",
    ESE: "112.5deg",
    SE: "135deg",
    SSE: "157.5deg",
    S: "180deg",
    SSW: "202.5deg",
    SW: "225deg",
    WSW: "247.5deg",
    W: "270deg",
    WNW: "292.5deg",
    NW: "315deg",
    NNW: "337.5",
  };

  constructor() {}

  ngOnInit() {
    this.initModule();
    console.log(this.data);
  }

  ngOnChanges() {
    this.initModule();
  }

  initModule() {
    this.setCompassDirection();
  }

  setCompassDirection() {
    this.windDirecDeg = this.windDirections[this.data.wind_dir];
  }
}
