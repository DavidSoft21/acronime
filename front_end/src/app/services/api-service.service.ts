import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor( private _urlAPI: HttpClient) { }

  getData(argumento:string): Observable<any>{
    return this._urlAPI.get(`http://localhost:3000/api/result/${argumento}`);
  }

  getFilter(): Observable<any> {
    return this._urlAPI.get(`http://localhost:3000/api/filter`);
  }

}
