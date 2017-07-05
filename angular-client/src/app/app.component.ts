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
  //result: string;
  result;
  constructor(private searchService: SearchService, private router: Router) {}

slide(){
  var elem = document.getElementById("div1");
  var pos = document.getElementById("div1").offsetHeight;
  var id = setInterval(frame, 5);
    function frame() {
      if(getComputedStyle(elem, null).bottom < '600px'){
        if (pos >=600) {
            clearInterval(id);
        } else {
            pos+=4; 
            //elem.style.bottom = pos + 'px'; 
            document.getElementById("div1").style.bottom = pos + 'px';
        }
      }
    }
}

  search() {
    //document.getElementById("div1").style.transform = "translateY(-100px)";
    this.searchService.search(this.term)
      .subscribe(data => {
        //this.result = JSON.stringify(data);
        this.result = data;
        this.searchService.setResult(this.result);
        this.slide();
        this.router.navigate(['/test.component.html']);
      });
  }
}

