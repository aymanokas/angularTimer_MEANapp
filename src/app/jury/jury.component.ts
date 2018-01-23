import { Component, OnInit } from '@angular/core';
import {Injectable} from '@angular/core';
import {TeamsAndScoresService} from '../teams-and-scores.service';
import axios from 'axios';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.scss']
})
export class JuryComponent implements OnInit {

  constructor(private _tAs : TeamsAndScoresService) { }

  ngOnInit() {
   
  }
teamAndScore;
teamsAndScores;
teamDb = [

];
  teams = [

];
ts :string = "";
 teamSet = false;
 teamID = 0;
  teamScore;
  timeBonus:number = 0;
  test(){
    
  }
  
  getTeamName(){
    let temp =    {
      teamName: (<HTMLInputElement>document.getElementById("inputTeamName")).value,
      teamScore : 0
    }
    this.teams.push(temp);
    this.teamID++;
   
    
    // this._tAs.addTeamAndScore(temp.teamName);
    // this._tAs.teamAndScore.subscribe(res => console.log("added : "+ res));
    // (<HTMLInputElement>document.getElementById("inputTeamName")).value = "";


    }

touched(){
  this.timeBonus += 0.5;
  if (this.timeBonus == 0 || this.timeBonus < 0){
    this.ts = this.timeBonus + " s" ;
  }else{
    this.ts = "+" + this.timeBonus + " s" ;
  }
  console.log(this.ts);

}

notTouched(){
  this.timeBonus -= 0.5;
  if (this.timeBonus == 0 || this.timeBonus < 0){
    this.ts = this.timeBonus + " s" ;
  }else{
    this.ts = "+" + this.timeBonus + " s" ;
  }
 
  console.log(this.ts);

}

onEnter(){
 
  this.getTeamName();
  this.teams[this.teamID-1].teamScore = this.ts;

  axios.post('http://localhost:1337/teams',  this.teams[this.teamID-1])
  .then(function (response) {
    console.log(response);
   
  })
  .catch(function (error) {
    console.log(error);
  });
  let s = this;

}


submitQuery(tID){
  let s = this;
  axios.get('http://localhost:1337/teams')
  .then(function (response) {
    s.teamDb= response.data;
    s.teamDb[tID].teamScore = s.ts;
    s.teams[tID].teamScore = s.ts;
    console.log(s.teams[tID]);
    console.log(s.teamDb);
    
    let temp = s.teamDb.find(function(e){
      return e.teamName == s.teams[tID].teamName
    });
    console.log(temp);
    axios.put('http://localhost:1337/teams/'+temp._id, temp)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
  

  //this.teams = [];
}
}
