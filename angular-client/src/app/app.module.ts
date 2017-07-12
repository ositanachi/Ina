import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchService } from './search.service';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { testComponent } from './result/test.component';
import { trendComponent } from './trend/trend.component';
import {loadComponent} from './loader/loader.component'
import { FlexLayoutModule } from "@angular/flex-layout";
import {MdCardModule} from '@angular/material';
import {MaterialModule} from '@angular/material';

const appRoutes: Routes = [
  {path: 'test.component.html', component: testComponent },
  {path: 'trend.component.html', component: trendComponent},
  {path: 'loader.component.html', component: loadComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    testComponent,
    trendComponent,
    loadComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    MdInputModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
