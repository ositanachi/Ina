import { Component} from '@angular/core'; //imports the component portions of the core angular library
import { SearchService } from './search.service'; //imports the SearchService class from the Search.service.ts file
import {Router} from '@angular/router';
@Component({ //An Angular class responsible for exposing data to a view and handling most of the view’s display and user-interaction logic
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] //an array of styles
})

export class AppComponent {
  term: string;
  result; //initializes a result of type any to hold the json array that is returned. 
  constructor(private searchService: SearchService, private router: Router) {}



  search() {
    this.searchService.search(this.term)
      .subscribe(data => {
        this.result = data;
        this.searchService.setResult(this.result);
        this.router.navigate(['/test.component.html']);
      });
  }
}

