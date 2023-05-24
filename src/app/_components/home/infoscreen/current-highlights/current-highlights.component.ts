import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-current-highlights",
  templateUrl: "./current-highlights.component.html",
  styleUrls: ["./current-highlights.component.scss"],
  standalone: true,
  imports: [CommonModule],
})
export class CurrentHighlightsComponent implements OnInit, OnChanges {
  @Input("currentData") data!: any;

  constructor() {}

  ngOnInit() {
    this.initModule();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initModule();
  }

  initModule() {
    console.log(this.data);
  }
}
