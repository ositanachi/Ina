import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchService } from './search.service';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import {testComponent} from './test.component';
import {trendComponent} from './trend.component';

const appRoutes: Routes = [
  {path: 'test.component.html', component: testComponent },
  {path: 'trend.component.html', component: trendComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    testComponent,
    trendComponent
  ],
  imports: [
    BrowserModule,
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
