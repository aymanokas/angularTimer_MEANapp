import { Component, OnInit } from '@angular/core';
import {RoundProgressModule, RoundProgressConfig} from 'angular-svg-round-progressbar';
import {JuryComponent} from '../jury/jury.component';
import axios from 'axios';

import {TeamsAndScoresService} from '../teams-and-scores.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})


export class ShowComponent implements OnInit {

  constructor(private _config: RoundProgressConfig, private _tAs : TeamsAndScoresService) {}

  ngOnInit() {
   
  this.getTeams();
 
  }
  blankScore;
  teamAndScore;
  teamsAndScores;
  scoreChrono=[];
  teamName = [];
  teams =[];
  teamDb =[]; 
  teamSet = false;
  teamID = 0;
  teamScore;
  timeBonus:number = 0;
  max     = 20;
  current = 0;
  num_lap = [];
  lap = [];
  lapbol = [];
  i = 0;
 
test(){
  this._tAs.teamAndScore.subscribe(res => console.log(res));
}

  start() {
    const interval = Observable.interval(100);
    
    interval
      .takeWhile(_ => !this.isFinished )
      .do(i => this.current += 0.1)
      .subscribe();
      this.getTeams();
  }

   /// finish timer
  getLap() {
    let s = this;
    this.lap[this.i] = this.current;
    this.lapbol[this.i]=true;
    this.num_lap[this.i] = this.i;
    this.teams[this.i].scoreChrono = this.current;
      axios.put('http://localhost:1337/teams/'+this.teams[this.i]._id, this.teams[this.i])
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });



    this.i++;
    
    
    this.current = 20;
    console.log("---------------------");
    console.log(this.teams);
    console.log("---------------------");
   
  }

  /// reset timer
  reset() {
    this.current = 0;
  }


  /// Getters to prevent NaN errors

  get maxVal() {
    return isNaN(this.max) || this.max < 0.1 ? 0.1 : this.max;
  }

  get currentVal() {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }

  get isFinished() {
    return this.currentVal >= this.maxVal;
  }

 getTeams(){
   let s = this;
  axios.get('http://localhost:1337/teams')
  .then(function (response) {
    s.teams= response.data;
    console.log("Get");
    console.log(s.teams);
     console.log(response.data)
    for(let i = 0 ; i < s.teams.length ; i++) {
  if(!s.teams[i].scoreChrono){
    s.i = i ;
    console.log(s.blankScore);
  
    break;
  }
    }
  })
  .catch(function (error) {
    console.log(error);
  });
 
 }

 delete(haID){
let self = this
  console.log(haID)
    axios.delete('http://localhost:1337/teams/'+haID)
    .then((res) => {
      console.log(res);
      self.getTeams();
    })
    .catch((err)=>{
      console.log(err)
    })

    
  }

  scoreFetch(){
    this.getTeams();
   
  }
}
