import { Component, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})

@Injectable()
export class AppComponent {
  AssignmentList: assignment[];

  AssignmentName: string;
  ScoredPoints: number;
  PointsPossible: number;

  TotalScoredPoints: number;
  TotalPointsPossible: number;
  TotalPercentGrade: number;
  Grade: string;

  private Url = 'http://localhost:3004/assignments';
  private headers = new Headers({"Content-Type": "application/json"});
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {
    this.AssignmentList = [];
    this.calcSums();
  }

  calcSums():void {
    this.getAssignmentService();
    
    this.TotalScoredPoints = 0;
    this.TotalPointsPossible = 0;
    this.TotalPercentGrade = 0;
    this.Grade = "N/A";

    for(var a of this.AssignmentList){
      this.TotalScoredPoints += a.scored;
      this.TotalPointsPossible += a.possible;
    }

    this.TotalPercentGrade = this.TotalScoredPoints / this.TotalPointsPossible;
    this.Grade = this.calcGrade(this.TotalPercentGrade);
  }

  getAssignments():assignment[] {
    return this.AssignmentList;
  }

  getAssignmentService():Promise<assignment[]> {
    return this.http.get(this.Url).toPromise().then(val => this.AssignmentList = val.json() as assignment[]).catch(this.handleError);
  }

  addAssignment():void {
    let newAssignment: assignment;
    newAssignment = {
      id: 100,
      assignment: this.AssignmentName,
      scored: this.ScoredPoints,
      possible: this.PointsPossible,
      percent: this.ScoredPoints / this.PointsPossible,
      grade: this.calcGrade(this.ScoredPoints / this.PointsPossible,),
    }
    
    this.addAssignmentService(newAssignment);
    this.getAssignmentService();
    this.calcSums();
  }

  addAssignmentService(newAssignment:assignment):Promise<void> {
    return this.http.post(this.Url, JSON.stringify(newAssignment), this.options).toPromise().then(() => null).catch(this.handleError);
  }

  deleteAssignment(deleted:assignment):void {
    this.deleteAssignmentService(deleted);
    this.getAssignmentService();
    this.calcSums();
  }

  deleteAssignmentService(deleted:assignment):Promise<void> {
    return this.http.delete(this.Url.concat("/" + deleted.id)).toPromise().then(() => null).catch(this.handleError);
  }

  calcGrade(num:number):string{
    if (num >= .9) { return "A" }
    if (num >= .8) { return "B" }
    if (num >= .7) { return "C" }
    if (num >= .6) { return "D" }
    return "F";
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

interface assignment {
  id: number;
  assignment: string;
  scored: number;
  possible: number;
  percent: number;
  grade: string;
}