import {KnockoutMatch} from "./Match";

export class KnockOutRound {

    name: string;
    matches: KnockoutMatch[];
    numberOfPlaces: number;

    constructor(name: string, numberOfMatches : number){
        this.name =  name;
        this.matches = [];
        for(let i = 0; i < numberOfMatches; i++){
            this.matches.push(new KnockoutMatch(undefined, undefined));
        }
    }

}