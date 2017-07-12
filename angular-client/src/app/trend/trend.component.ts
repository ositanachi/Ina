import {Component} from '@angular/core';
import { SearchService } from '../search.service';

@Component({
    templateUrl: './trend.component.html',
    styleUrls: ['./trend.component.css']
})



export class trendComponent{
    trends = ['Donald Trump', 'Steve Harvey', 'Kim Kardashian', 'The Warriors', 'Iphone 8', 'Russia', 'The Cavaliers', 'Nintendo Switch'];
}