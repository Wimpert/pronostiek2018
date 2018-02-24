import {KnockoutMatch} from "./Match";
import {Group} from "./Group";

export class Tournament{
    groups : Group[] =  [];
    knockOutRounds :  [KnockoutMatch[]];
}