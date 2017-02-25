import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let assignments = [
      { assignment: "Quiz", scored: 16, possible: 20,  percent: .8, grade: "B" },
    ];
    return {assignments};}
}
