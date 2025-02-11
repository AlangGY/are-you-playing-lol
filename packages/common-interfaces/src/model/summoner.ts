import { Champion } from "./champion";
import { Perks } from "./perks";
import { SummonerSpell } from "./summoner-spell";

export interface Summoner {
  puuid: string;
  teamId: number;
  champion: Champion;
  spells: SummonerSpell[];
  profileIconId: number;
  riotId: string;
  bot: boolean;
  summonerId: string;
  gameCustomizationObjects: any[];
  perks: Perks;
}
