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
    console.log(' get mmmmmmmmmmmmmmm option fieldConfig=', fieldConfig);
    const options = [
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
    return of(options);
  }
}
