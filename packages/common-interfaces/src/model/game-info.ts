import { BannedChampion } from "./banned-champion";
import { Observer } from "./observer";
import { Summoner } from "./summoner";

export interface GameInfo {
  gameId: number;
  mapId: number;
  gameMode: string;
  gameType: string;
  gameQueueConfigId: number;
  redTeam: Summoner[];
  blueTeam: Summoner[];
  observers: Observer;
  platformId: string;
  bannedChampions: BannedChampion[];
  gameStartTime: number;
  gameLength: number;
}
