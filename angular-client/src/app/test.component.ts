import {Component} from '@angular/core';
import { SearchService } from './search.service';
import { AppComponent } from './app.component'
@Component({
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class testComponent{
    constructor(private searchService: SearchService) {}
    timeout: 3000;
    /*results;
    displayResult(){
        this.results = this.searchService.getResult();
    }
    wait(){
    setTimeout(this.displayResult, this.timeout);
    }*/
    results = this.searchService.getResult();
    //results = ['Cats', 'Dogs', 'Beagles', 'Chicken', 'Yodalaheehoo', 'I', 'Am', 'Not', 'A', 'Human'];
}
