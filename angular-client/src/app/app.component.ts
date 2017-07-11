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
  result; //initializes a varialbe of type any to hold the array that is recieved from the search function. 
  constructor(private searchService: SearchService, private router: Router) {}

  search() {
    this.searchService.search(this.term)
      .subscribe(data => {
        this.result = data;//stores an array of the results in the result variable
        this.searchService.setResult(this.result);//stores the result in searchServices result variable
        this.router.navigate(['/test.component.html']);//routes to the results page
      });
  }
}

