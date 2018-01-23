import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TeamsAndScoresService {


private teamsAndScores = new BehaviorSubject<any>([]);
teamAndScore = this.teamsAndScores.asObservable();


  constructor() { }


addTeamAndScore(teamAndScore){
this.teamsAndScores.next(teamAndScore);
}
}
