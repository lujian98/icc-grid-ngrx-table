import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const newreq = { ...req };
    //console.log( ' req=', req) // columnConfig statelist
    if (req.url === '/api/DCR/brand') {
      newreq.url = newreq.urlWithParams = '/api/DCR_brand';
    }
    if (req.url === '/api/DCR/color') {
      newreq.url = newreq.urlWithParams = '/api/DCR_color';
    }
    if (req.url === '/api/DCR/columnConfig') {
      newreq.url = newreq.urlWithParams = '/api/DCR_columnConfig';
    }

    if (req.url === '/api/usa/state') {
      newreq.url = newreq.urlWithParams = '/api/usa_state';
    }
    if (req.url === '/api/usa/statelist') {
      newreq.url = newreq.urlWithParams = '/api/usa_statelist';
    }

    if (req.url === '/api/usa/SingleRemote') {
      newreq.url = newreq.urlWithParams = '/api/usa_SingleRemote';
    }
    if (req.url === '/api/usa/SingleRemoteFieldConfig') {
      newreq.url = newreq.urlWithParams = '/api/usa_SingleRemoteFieldConfig';
    }
    if (req.url === '/api/usa/MultiRemote') {
      newreq.url = newreq.urlWithParams = '/api/usa_MultiRemote';
    }
    if (req.url === '/api/usa/MultiRemoteFieldConfig') {
      newreq.url = newreq.urlWithParams = '/api/usa_MultiRemoteFieldConfig';
    }

    if (req.url === '/api/usa/SingleAutocompleteRemotes') {
      newreq.url = newreq.urlWithParams = '/api/usa_SingleAutocompleteRemotes';
    }
    if (req.url === '/api/usa/SingleAutocompleteRemotesFieldConfig') {
      newreq.url = newreq.urlWithParams = '/api/usa_SingleAutocompleteRemotesFieldConfig';
    }
    if (req.url === '/api/usa/MultiAutocompleteRemotes') {
      newreq.url = newreq.urlWithParams = '/api/usa_MultiAutocompleteRemotes';
    }
    if (req.url === '/api/usa/MultiAutocompleteRemotesFieldConfig') {
      newreq.url = newreq.urlWithParams = '/api/usa_MultiAutocompleteRemotesFieldConfig';
    }

    return next.handle(newreq as HttpRequest<any>);
  }
}
