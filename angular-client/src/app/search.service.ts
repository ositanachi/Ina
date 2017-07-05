import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

// generated using "ng generate service search"
@Injectable()
export class SearchService {
  result;
  constructor(private http: Http) {}
  // docker dns allows you to access the service through it's service name
  search(term: string): Observable<{}> {
    return this.http
      .get('http://backend.howard.test:8080/search?q=' + term)
      .map(response => response.json());
  }
  setResult(result){
    this.result = result;
  }
  getResult(){
    //setTimeout(function(){
    return this.result;
    //}, 2000)
  }
}
