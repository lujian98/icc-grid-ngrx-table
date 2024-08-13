import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const newreq = { ...req };
    console.log( ' req=', req)
    /*
    if (req.url === '/api/cars/getOptions') {
      newreq.url = newreq.urlWithParams = '/api/cars_getOptions';
    }*/
    return next.handle(newreq as HttpRequest<any>);
  }
}
