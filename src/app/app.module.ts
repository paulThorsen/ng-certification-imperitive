import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeatherService } from './core/weather.service';
import { ZipCodeManagerService } from './core/zip-code-manager.service';
import { ForecastComponent } from './forecast/forecast.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, ForecastComponent, DashboardComponent],
  bootstrap: [AppComponent],
  providers: [WeatherService, ZipCodeManagerService]
})
export class AppModule {}
