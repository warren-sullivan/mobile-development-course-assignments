import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})

export class AppComponent {
  AssignmentList: assignment[];

  AssignmentName: string;
  ScoredPoints: number;
  PointsPossible: number;

  TotalScoredPoints: number;
  TotalPointsPossible: number;
  TotalPercentGrade: number;
  Grade: string;

  constructor() {
    this.AssignmentList = [];
    this.TotalScoredPoints = 0;
    this.TotalPointsPossible = 0;
    this.TotalPercentGrade = 0;
    this.Grade = "N/A";
  }

  addAssignment():void {
    let newAssignment: assignment;
    newAssignment = {
      assignment: this.AssignmentName,
      scored: this.ScoredPoints,
      possible: this.PointsPossible,
      percent: this.ScoredPoints / this.PointsPossible,
      grade: this.calcGrade(this.ScoredPoints / this.PointsPossible,),
    }

    this.TotalScoredPoints += this.ScoredPoints;
    this.TotalPointsPossible += this.PointsPossible;
    this.TotalPercentGrade = this.TotalScoredPoints / this.TotalPointsPossible;
    this.Grade = this.calcGrade(this.TotalPercentGrade);

    this.AssignmentList.push(newAssignment);
  }

  deleteAssignment(num:number):void {
    this.TotalScoredPoints -= this.AssignmentList[num].scored;
    this.TotalPointsPossible -= this.AssignmentList[num].possible;
    this.TotalPercentGrade = this.TotalScoredPoints / this.TotalPointsPossible;
    this.Grade = this.calcGrade(this.TotalPercentGrade);

    this.AssignmentList.splice(num, 1);

    if (this.AssignmentList.length === 0){
      this.TotalPercentGrade = 0;
      this.Grade = "N/A";
    }
  }

  calcGrade(num:number):string{
    if (num >= .9) { return "A" }
    if (num >= .8) { return "B" }
    if (num >= .7) { return "C" }
    if (num >= .6) { return "D" }
    return "F";
  }
}

interface assignment {
  assignment: string;
  scored: number;
  possible: number;
  percent: number;
  grade: string;
}