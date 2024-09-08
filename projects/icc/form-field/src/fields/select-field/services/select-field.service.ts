import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IccSelectFieldConfig } from '../models/select-field.model';

@Injectable({
  providedIn: 'root',
})
export class IccSelectFieldService {
  private http = inject(HttpClient);

  getSelectFieldOptions(fieldConfig: IccSelectFieldConfig): Observable<any[]> {
    //console.log(' get mmmmmmmmmmmmmmm option fieldConfig=', fieldConfig);
    let options: any = [];
    const fieldName = fieldConfig.fieldName;
    if (fieldName === 'brand') {
      options = [
        { title: '', name: '' },
        { title: 'Audi', name: 'Audi' },
        { title: 'BMW', name: 'BMW' },
        { title: 'Mercedes', name: 'Mercedes' },
        { title: 'Renault', name: 'Renault' },
        { title: 'Volvo', name: 'Volvo' },
        { title: 'Fiat', name: 'Fiat' },
        { title: 'Chrysler', name: 'Chrysler' },
        { title: 'Ford', name: 'Ford' },
        { title: 'GM', name: 'GM' },
        { title: 'Honda', name: 'Honda' },
        { title: 'Jaguar', name: 'Jaguar' },
        { title: 'VW', name: 'VW' },
      ];
    } else if (fieldName === 'color') {
      options = [
        { title: '', name: '' },
        { title: 'Black', name: 'Black' },
        { title: 'Blue', name: 'Blue' },
        { title: 'Brown', name: 'Brown' },
        { title: 'Green', name: 'Green' },
        { title: 'Maroon', name: 'Maroon' },
        { title: 'Orange', name: 'Orange' },
        { title: 'Red', name: 'Red' },
        { title: 'Silver', name: 'Silver' },
        { title: 'Yellow', name: 'Yellow' },
        { title: 'White', name: 'White' },
      ];
    }
    return of(options);
  }
}
