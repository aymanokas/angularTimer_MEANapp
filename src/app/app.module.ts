import { BrowserModule } from '@angular/platform-browser';
import {TeamsAndScoresService} from './teams-and-scores.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JuryComponent } from './jury/jury.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ShowComponent } from './show/show.component';
import { GobackdudeComponent } from './gobackdude/gobackdude.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'jury',      component: JuryComponent },
  { path: 'show',      component: ShowComponent },
  { path : 'goBackDude',    component: GobackdudeComponent },
  { path: '**',      component: NotfoundComponent },
 
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JuryComponent,
    NotfoundComponent,
    ShowComponent,
    GobackdudeComponent
  ],
  imports: [
    BrowserModule,
     MDBBootstrapModule.forRoot(),
     RouterModule.forRoot(appRoutes,),
     RoundProgressModule
   
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [TeamsAndScoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
