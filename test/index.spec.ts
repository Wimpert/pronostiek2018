import {Tournament} from "../src/models/Tournament";
import {getMatchesFromTeams, getTournament, orderTeams} from "../src/utils/TournamentUtils";
import {
    setGroupMatchScores, setGroupMatchScore2FullyEqualTeams, setGroupMatchScore3EqualTeams,
    setGroupMatchScore2on2EqualTeamsWithDifferenceBetween
} from "./SpecHelpers";

describe("this will test the processing of the group matches:", function() {

    let  tournament : Tournament = getTournament();

    it("tournament should contain group1 A", function () {
        expect(tournament.groups[0].groupname).toEqual("Group A");
    });

    setGroupMatchScores(tournament);

    let groupA =  tournament.groups[0];
    groupA.processMatches();

    let teamA = tournament.groups[0].teams[0];

    it("team A has 3 points", function() {
        expect(teamA.points).toEqual(4);
    });

    it("team C has 1 points", function() {
        expect(tournament.groups[0].teams[2].points).toEqual(2);
    });

    it("team D has 2 points", function() {
        expect(tournament.groups[0].teams[3].points).toEqual(2);
    });

    it("team A has scored 3 goals", function () {
        expect(teamA.goalsScored).toBe(6);
    });

    it("team A has concieved 4 goals", function () {
        expect(teamA.goalsConcieved).toBe(4);
    });

    it("team A has 1 drawed match", function () {
        expect(teamA.matchesDrawed).toBe(1);
    });

    it("team A has 1 won match", function () {
        expect(teamA.matchesWon).toBe(1);
    });
});

describe("this will test the processing of the group matches:", function() {


    var  tournament : Tournament = getTournament();
    setGroupMatchScores(tournament);
    var groupA =  tournament.groups[0];
    groupA.processMatches();
    orderTeams(groupA);

    it("Russia first", function () {
       expect(groupA.teams[0].name).toEqual("Russia");
    });


    it("Egypt second ", function () {
        expect(groupA.teams[1].name).toEqual("Egypt");
    });

    it("Uruguay last", function () {
        expect(groupA.teams[2].name).toEqual("Uruguay");
    });

    it("Saudi Arabia third", function () {
        expect(groupA.teams[3].name).toEqual("Saudi Arabia");
    });
    console.log("group A: " + groupA);
    var equalTeams = groupA.getEqualTeams();

    it("Egypt an Uruguay are concidered equal", function(){
       expect(equalTeams[0].length).toBe(2);
       let first = equalTeams[0][0].name == "Egypt" ||  equalTeams[0][0].name == "Uruguay";
       let second = equalTeams[0][1].name == "Egypt" ||  equalTeams[0][1].name == "Uruguay";
       expect(first).toBeTruthy();
       expect(second).toBeTruthy();

    });

});

describe("we want to be able to select a subset of matches", function () {

    var tournament = getTournament();
    var groupA =  tournament.groups[0];
    var subMatches =  getMatchesFromTeams([groupA.teams[1],groupA.teams[2],groupA.teams[3]],groupA.matches)

    it("we expect 3 matches to be selected", function(){
        expect(subMatches.length).toBe(3);
    });

});


describe("If 3 Teams are equal we need make a difference between them", function () {

    var tournament = getTournament();

    setGroupMatchScore3EqualTeams(tournament);

    var groupA = tournament.groups[0];
    groupA.processMatches();
    orderTeams(groupA);


    it("we expect 3 teams to be equal", function(){
           expect(groupA.getEqualTeams().length).toBe(1);
           expect(groupA.getEqualTeams()[0].length).toBe(3);

    });


    it("Russia should be first", function () {
        expect(groupA.teams[0].name).toBe("Russia")
    });

    it("Saudi Arabia should be second", function () {
        expect(groupA.teams[1].name).toBe("Saudi Arabia")
    })
    it("Uruguay should be third", function () {
        expect(groupA.teams[2].name).toBe("Uruguay")
    })
    it("Egypt should be last", function () {
        expect(groupA.teams[3].name).toBe("Egypt")
    })



});

describe("If 2 on 2 Teams are equal we need make a difference between them", function () {

    var tournament = getTournament();

    setGroupMatchScore2on2EqualTeamsWithDifferenceBetween(tournament);

    var groupB = tournament.groups[1];
    groupB.processMatches();
    orderTeams(groupB, true);


    it("we expect 2 teams to be equal", function(){
        expect(groupB.getEqualTeams().length).toBe(2);
        expect(groupB.getEqualTeams()[0].length).toBe(2);
        expect(groupB.getEqualTeams()[1].length).toBe(2);
    });

});