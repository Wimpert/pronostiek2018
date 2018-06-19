import { KnockOutRound } from './pronostiek/KnockOutRound';
import { KnockoutMatch } from './pronostiek/Match';
import { Match } from './../../../../api/src/shared/models/pronostiek/Match';

export interface PronostiekViewModel{
    firstname:string,
    lastname:string,
    email: string,
    userId: number,
    matches: Match[],
    knockoutRounds: KnockOutRound[]
}