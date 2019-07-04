import { Character } from './character.interface';

export interface ApplicationSession {
    account: string;
    sessionId: string;
    league: string;
    tradeLeague: string;
    validated: boolean;
    loading: boolean;
    characterLeagues: string[];
    tradeLeagues: string[];
    characters: Character[];
}
