import { AfterViewInit, Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { WeatherConditions } from './core/models/weather-conditions';
import { WeatherService } from './core/weather.service';
import { ZipCodeManagerService } from './core/zip-code-manager.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
