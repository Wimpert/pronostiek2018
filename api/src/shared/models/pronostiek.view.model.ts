import { KnockoutMatch } from './pronostiek/Match';
import { Match } from './../../../../api/src/shared/models/pronostiek/Match';

export interface PronostiekViewModel{
    firstname:string,
    lastname:string,
    matches: Match[],
    knockoutMatches: KnockoutMatch[]
}