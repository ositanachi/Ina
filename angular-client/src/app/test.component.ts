import {Component} from '@angular/core';
import { SearchService } from './search.service';
import { AppComponent } from './app.component'
@Component({
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class testComponent{
    constructor(private searchService: SearchService) {}
    pagenum = 1;
    begin = 0;
    end = 10;
    all_results = this.searchService.getResult();
    results = this.all_results.slice(this.begin, this.end);
    pageNext(){
        if(this.end < this.all_results.length){
            this.begin += 10;
            this.end += 10;
            this.pagenum++;
            this.results = this.all_results.slice(this.begin, this.end);
        }
    }
    pagePrev(){
        if(this.begin >= 10){
            this.begin -= 10;
            this.end -= 10;
            this.pagenum--;
            this.results = this.all_results.slice(this.begin, this.end);
        }
    }
}
