import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {
  result;
  constructor(private http: Http) {}
  search(term: string): Observable<{}> {
    return this.http
      .get('http://backend.howard.test:8080/search?q=' + term)
      .map(response => response.json());
  }
  setResult(result){//used to store the result recieved within app.component and store it within search service
    this.result = result;
  }
  getResult(){//returns the value stored in search services result
    return this.result;
  }
}
