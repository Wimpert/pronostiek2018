import {Team} from "./models/Team";
import {Group} from "./models/Group";


var t1 = new Team("Russia");
var t2 = new Team("Saudi Arabia");
var t3 = new Team("Egypt");
var t4 = new Team("Uruguay");


var groupA =  new Group("Group A" , [t1, t2, t3, t4]);

//group.matches[]

groupA.matches[0].outTeamScore = 1;
groupA.matches[0].homeTeamScore = 3;

groupA.matches[1].outTeamScore = 0;
groupA.matches[1].homeTeamScore = 0;

groupA.processMatches();


console.log(groupA);