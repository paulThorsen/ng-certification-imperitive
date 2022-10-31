import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const ZIP_CODES_LOCAL_STORAGE_KEY = 'weatherZipCodes';

@Injectable()
export class ZipCodeManagerService {
  constructor() {}

  public addZipCode = (zipCode: number): Observable<number[]> => {
    let updatedZipCodes = [];
    return this.getZipCodes().pipe(
      switchMap(zipCodes => {
        updatedZipCodes = zipCodes;
        updatedZipCodes.push(zipCode);
        return this.setZipCodes(updatedZipCodes);
      })
    );
  };

  public removeZipCode = (zipCode: number): Observable<number[]> => {
    let updatedZipCodes = [];
    return this.getZipCodes().pipe(
      switchMap(zipCodes => {
        updatedZipCodes = zipCodes.filter(zip => zip !== zipCode);
        return this.setZipCodes(updatedZipCodes);
      })
    );
  };

  /**
   * Get zipCodes from localStorage
   * @returns zipCodes array to save to localStorage
   */
  public getZipCodes = (): Observable<number[]> => {
    return of(JSON.parse(localStorage.getItem(ZIP_CODES_LOCAL_STORAGE_KEY)) ?? []);
  };

  /**
   * Add zipCodes to localStorage
   * @param zipCodes zipCodes array to save to localStorage
   */
  public setZipCodes = (zipCodes: number[]): Observable<number[]> => {
    localStorage.setItem(ZIP_CODES_LOCAL_STORAGE_KEY, JSON.stringify(zipCodes));
    return this.getZipCodes();
  };
}
