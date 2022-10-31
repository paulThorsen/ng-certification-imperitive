import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DayForecast } from './models/day-forecast';
import { WeatherConditions } from './models/weather-conditions';

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/';
const UNIT_TYPE = 'imperial';

// In real life this is a bad idea. Secrets should be secret. YOLO for the API key.
const API_KEY = '5a4b2d457ecbef9eb2a71e480b947604';

@Injectable()
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  public getWeatherConditionsByZip = (zipCode: number): Observable<any> => {
    const uri =
      BASE_WEATHER_URL +
      'weather' +
      '?zip=' +
      zipCode +
      '&units=' +
      UNIT_TYPE +
      '&appid=' +
      API_KEY;

    return this.httpClient.get<WeatherConditions>(uri).pipe(
      catchError((err, caught) => {
        console.log(err, caught);
        return of(null);
      })
    );
  };

  public getDayForecaseByZip = (
    zipCode: number,
    days: number
  ): Observable<DayForecast> => {
    const uri =
      BASE_WEATHER_URL +
      'forecast/daily' +
      '?zip=' +
      zipCode +
      '&cnt=' +
      days +
      '&units=' +
      UNIT_TYPE +
      '&appid=' +
      API_KEY;

    console.log(uri);
    return this.httpClient.get<DayForecast>(uri);
  };
}
