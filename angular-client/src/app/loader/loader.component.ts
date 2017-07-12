import { Component} from '@angular/core'; //imports the component portions of the core angular library
import {Router} from '@angular/router'
@Component({ //An Angular class responsible for exposing data to a view and handling most of the view’s display and user-interaction logic
  templateUrl: './loader.component.html',
})

export class loadComponent {
    constructor(private router: Router){
        this.router.navigate(['/test.component.html']);
    }
}