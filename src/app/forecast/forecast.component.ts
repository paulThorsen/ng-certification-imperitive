import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DayForecast } from '../core/models/day-forecast';
import { WeatherService } from '../core/weather.service';

const FORECASTED_DAYS = 5;

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  zipCode = null;
  weatherConditionsForZip: DayForecast = null;

  constructor(private route: ActivatedRoute, private weather: WeatherService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const zipCode = parseInt(params.get('zipCode'));
      this.zipCode = zipCode;

      this.weather
        .getDayForecaseByZip(zipCode, FORECASTED_DAYS)
        .subscribe(forecast => {
          console.log('forecast', forecast);
          this.weatherConditionsForZip = forecast;
        });
    });
  }
}
