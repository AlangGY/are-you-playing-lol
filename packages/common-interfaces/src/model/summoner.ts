import { Perks } from "./perks";

export interface Summoner {
  puuid: string;
  teamId: number;
  spell1Id: number;
  spell2Id: number;
  championId: number;
  profileIconId: number;
  riotId: string;
  bot: boolean;
  summonerId: string;
  gameCustomizationObjects: any[];
  perks: Perks;
}
