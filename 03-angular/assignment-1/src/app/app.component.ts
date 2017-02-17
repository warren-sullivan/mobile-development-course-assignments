import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <style>
    /* Defines a cleaner look for tables */
    table  { border-collapse: collapse; }
    td, th { border: 1px solid black; padding: 3px 8px; }
    th     { text-align: left; }
  </style>
  <p><b>Student: </b>Bob Smith</p>
  <p><b>Email: </b>bobsmith@gmail.com</p>
  <p><b>Performance</b></p>
  <table>
    <tr>
      <th>Points</th>
      <th>Points Possible</th>
      <th>Percent</th>
      <th>Grade</th>
    </tr>
    <tr>
      <td>{{TotalScoredPoints}}</td>
      <td>{{TotalPointsPossible}}</td>
      <td>{{TotalPercentGrade | percent}}</td>
      <td>{{Grade}}</td>
    </tr>
  </table>
  <hr />
  <p><b>Add Assignment</b></p>
  <p>
    Assingment Name: 
    <input type="text" [(ngModel)]="AssignmentName" />
  </p>
  <p>
    Scored Points: 
    <input type="number" [(ngModel)]="ScoredPoints" />
  </p>
  <p>
    Points Possible: 
    <input type="number" [(ngModel)]="PointsPossible" />
  </p>
  <button (click)="addAssignment()">Add Assignment</button>
  <p><b>Assignments</b></p>
  <table>
    <tr>
      <th>Assignment Name</th>
      <th>Points Scored</th>
      <th>Points Possible</th>
      <th>Percent</th>
    </tr>
    <tr *ngFor="let assignment of AssignmentList">
      <td>{{ assignment.assignment}}</td>
      <td>{{ assignment.scored }}</td>
      <td>{{ assignment.possible }}</td>
      <td>{{ assignment.percent | percent }}</td>
    </tr>
  </table>
  `,
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
    }

    this.TotalScoredPoints += this.ScoredPoints;
    this.TotalPointsPossible += this.PointsPossible;
    this.TotalPercentGrade = this.TotalScoredPoints / this.TotalPointsPossible;
    this.Grade = this.calcGrade();

    this.AssignmentList.push(newAssignment);
  }

  calcGrade():string{
    if (this.TotalPercentGrade >= .9) { return "A" }
    if (this.TotalPercentGrade >= .8) { return "B" }
    if (this.TotalPercentGrade >= .7) { return "C" }
    if (this.TotalPercentGrade >= .6) { return "D" }
    return "F";
  }
}

interface assignment {
  assignment: string;
  scored: number;
  possible: number;
  percent: number;
}