import { Injectable } from '@angular/core';

import { Observable, of , throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlatterService {

  private baseUrl1="https://restsimulator.intuhire.com/blotter_columns";
  private baseUrl2="https://restsimulator.intuhire.com/orders";
  private baseUrl3="https://restsimulator.intuhire.com";

  constructor(private http: HttpClient) { }
  
  // try 3
  // getData(){
  //   return this.http.get(this.baseUrl2);
  // }
  getData(){
    return this.http.get(`${this.baseUrl3}/orders`);
  }
  // try 2

  // private extractData(res: Response) {
  //   let body = res;
  //   return body || { };
  // }

  // fetchBlatterColumnValues(): Observable<any>{
  //   return this.http.get(this.baseUrl2)
  //   .pipe(
  //     map(this.extractData));
        
  // }

  // fetchBlatterColumnValues(): Observable<any>{
  //   return this.http.get(this.baseUrl2)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )   
  // }


  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
    } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
    }

}
