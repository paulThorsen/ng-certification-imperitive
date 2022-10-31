import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WeatherConditions } from '../core/models/weather-conditions';
import { WeatherService } from '../core/weather.service';
import { ZipCodeManagerService } from '../core/zip-code-manager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  zipCodeInput: number = null;
  zipCodeWeatherConditions: {
    zipCode: number;
    conditions: WeatherConditions;
  }[] = [];

  showZipCodeHint = false;
  // Will be hidden if null
  errorText = null;
  isLoading = false;

  constructor(
    private weather: WeatherService,
    private zipCodeManager: ZipCodeManagerService
  ) {}

  ngOnInit() {
    this.zipCodeManager.getZipCodes().subscribe(zipCodes => {
      console.log('local storage zip codes', zipCodes);
      for (const zipCode of zipCodes) {
        this.weather.getWeatherConditionsByZip(zipCode).subscribe(weather => {
          this.zipCodeWeatherConditions.push({
            zipCode: zipCode,
            conditions: weather
          });
        });
      }
    });
  }

  public addLocation = (zipCode: number): void => {
    this.errorText = null;
    if (zipCode <= 9999 || zipCode > 99999) {
      this.showZipCodeHint = true;
      return;
    }
    this.showZipCodeHint = false;
    this.weather.getWeatherConditionsByZip(zipCode).subscribe(weather => {
      if (weather) {
        this.zipCodeWeatherConditions.push({
          zipCode: zipCode,
          conditions: weather
        });
        // Only save zipcode if there was not error.
        this.zipCodeManager.addZipCode(zipCode).subscribe();
      } else {
        this.errorText =
          'Could not find data for zipcode ' +
          zipCode +
          '. Please try another zipcode.';
      }
      this.isLoading = false;
    });
    this.zipCodeInput = null;
  };

  public removeLocation = (zipCode: number): void => {
    // Remove from weather conditions
    this.zipCodeWeatherConditions = this.zipCodeWeatherConditions.filter(
      weather => weather.zipCode !== zipCode
    );
    this.zipCodeManager.removeZipCode(zipCode).subscribe();
  };
}
