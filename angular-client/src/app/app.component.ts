import { Component} from '@angular/core'; //imports the component portions of the core angular library
import { SearchService } from './search.service'; //imports the SearchService class from the Search.service.ts file

@Component({ //An Angular class responsible for exposing data to a view and handling most of the view’s display and user-interaction logic
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] //an array of styles
})

export class AppComponent {
  term: string;
  result: string;

  constructor(private searchService: SearchService) {}

  search() {
    document.getElementById("div1").style.transform = "translateY(-100px)";
    this.searchService.search(this.term)
      .subscribe(data => {
        this.result = JSON.stringify(data);
      });
  }


}

