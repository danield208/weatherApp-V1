import { Component } from "@angular/core";

@Component({
  selector: "app-info-small",
  template: `
    <mat-card>
      <mat-card-content>
        <div class="top">
          <div>
            <span>{{ data.location.name }}</span>
            <span>{{ data.location.localtime.split(" ")[1] }}</span>
          </div>
          <span>{{ data.current.temp_c }}&#176;</span>
        </div>
        <div class="bottom">
          <span>{{ data.current.condition.text }}</span>
          <span
            >H: {{ data.forecastday[0].day.maxtemp_c }}&#176; | T:
            {{ data.forecastday[0].day.mintemp_c }}&#176;</span
          >
        </div>
      </mat-card-content>

      <mat-card-footer>
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </mat-card-footer>
    </mat-card>
  `,
  styleUrls: ["info-small.component.scss"],
})
export class InfoSmallComponent {}
