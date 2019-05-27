import { Injectable } from '@angular/core';

import { Observable, of , throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlatterService {

  private baseUrl1="https://restsimulator.intuhire.com";
  
  private baseUrl3="https://restsimulator.intuhire.com";

  constructor(private http: HttpClient) { }
  
 
  getData(){
    return this.http.get(`${this.baseUrl3}/orders`);
  }

  getColumn(){
    return this.http.get(`${this.baseUrl1}/blotter_columns`);
  }

  test(){
    console.log("I am test");
  }
 

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
