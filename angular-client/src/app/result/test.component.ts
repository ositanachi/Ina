import {Component} from '@angular/core';
import { SearchService } from '../search.service';
import { AppComponent } from '../app.component'
@Component({
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class testComponent{

    pagenum = 1;
    begin = 0;
    end = 10;//variables pagenum, begin, and end, store the number of the current page, the index that the results being displayed start from, and the maximum index of results to be displayed 
    constructor(private searchService: SearchService) {
        //this.all_results = this.searchService.getResult();
        //this.results = this.all_results.slice(this.begin, this.end);
    }
    all_results = this.searchService.getResult();//stores an array of every result to be stored
    results = this.all_results.slice(this.begin, this.end);//stores a subarray of all_results that will be displayed on the ruesults page
    linker(str){
        return str.slice(2).replace(/_/g, '/');
    };
    pageNext(){//displays the next set of results from all_results
        if(this.end < this.all_results.length){//if we are not already displaying the last value in all_results
            this.begin += 10;
            this.end += 10;
            this.pagenum++;//changes the values of the variables that determine what is displayed
            this.results = this.all_results.slice(this.begin, this.end);//changes the results that are displayed
        }
    }
    pagePrev(){
        if(this.begin >= 10){//if we are not already displaying the first values in all_results
            this.begin -= 10;
            this.end -= 10;
            this.pagenum--;//change decrease the variables that determine what is displayed
            this.results = this.all_results.slice(this.begin, this.end);//changes displayed results
        }
    }
    scrollTop(){
        /*if(this.all_results >= 10){
            window.scrollTo(0, 0);
        }*/
        window.scrollTo(0,0);
    }
}
