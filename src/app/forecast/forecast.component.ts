import { Component, DoCheck, Input, OnChanges, Type } from '@angular/core';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements DoCheck {
  @Input() forecast: any[] = [
    {
      day: '#',
      date: '#',
      conditionIcon: '#',
      maxTemp_c: '#',
      chanceOfRain: '#',
    },
  ];
  forecastReady: boolean = false;

  ngDoCheck() {
    if (this.forecast.length == 5) this.forecastReady = true;
  }
}
