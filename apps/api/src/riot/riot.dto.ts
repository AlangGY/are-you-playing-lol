export interface SpectatorV5ResponseDto {
  gameId: number;
  mapId: number;
  gameMode: string;
  gameType: string;
  gameQueueConfigId: number;
  participants: Summoner[];
  observers: Observer;
  platformId: string;
  bannedChampions: BannedChampion[];
  gameStartTime: number;
  gameLength: number;
}

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

export interface Perks {
  perkIds: number[];
  perkStyle: number;
  perkSubStyle: number;
}

export interface Observer {
  encryptionKey: string;
}

export interface BannedChampion {
  championId: number;
  teamId: number;
  pickTurn: number;
}

export interface ChampionJson {
  type: 'champion';
  format: string;
  version: string;
  data: Record<string, ChampionData>;
}

export interface ChampionData {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: ChampionInfo;
  image: ChampionImage;
  tags: string[];
  partype: string;
  stats: ChampionStats;
}

export interface ChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface ChampionImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

export interface SummonerSpellJson {
  type: 'summoner';
  format: string;
  version: string;
  data: Record<string, SummonerSpellData>;
}

export interface SummonerSpellData {
  id: string;
  name: string;
  description: string;
  key: string;
}
