export class Team {

    name: string;
    points: number = 0 ;
    matchesWon: number = 0 ;
    matchesLost: number = 0;
    matchesDrawed: number = 0;
    goalsScored: number = 0;
    goalsConcieved: number = 0;


    constructor(name:string){
        this.name =  name;
    }

    reset() :void {
        this.goalsScored = 0;
        this.points = 0;
        this.matchesDrawed = 0;
        this.matchesWon = 0;
        this.matchesWon = 0;
        this.goalsConcieved = 0;
        this.matchesDrawed = 0;
    }

    getGoalsDifference() : number {
        return this.goalsScored - this.goalsConcieved;
    }


}