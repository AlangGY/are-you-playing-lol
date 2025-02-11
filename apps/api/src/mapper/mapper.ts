import type { Model } from '@are-you-playing-lol/common-interfaces';
import { GetCurrentGameResponseDto } from '../dto/get-current-game.dto';
import {
  ChampionJson,
  SpectatorV5ResponseDto,
  Summoner,
  SummonerSpellJson,
} from '../riot/riot.dto';
import { RiotService } from '../riot/riot.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Mapper {
  private initialized = false;
  private championJson: ChampionJson | null = null;
  private summonerSpellJson: SummonerSpellJson | null = null;
  private assetBaseUrl: string | null = null;
  constructor(private riotService: RiotService) {}

  async init() {
    if (this.initialized) {
      return;
    }
    const [championJson, assetBaseUrl, summonerSpellJson] = await Promise.all([
      this.riotService.getChampionJson(),
      this.riotService.getAssetBaseUrl(),
      this.riotService.getSummonerSpellJson(),
    ]);
    this.championJson = championJson;
    this.assetBaseUrl = assetBaseUrl;
    this.summonerSpellJson = summonerSpellJson;
    this.initialized = true;
  }

  async SpectatorV5ResponseDtoToGetCurrentGameResponseDto(
    spectatorV5ResponseDto: SpectatorV5ResponseDto,
  ): Promise<GetCurrentGameResponseDto> {
    await this.init();

    const { participants, ...rest } = spectatorV5ResponseDto;

    const teamRed = participants
      .filter((participant) => participant.teamId === 100)
      .map((participant) => {
        const { championId, spell1Id, spell2Id, ...rest } = participant;
        return {
          ...rest,
          champion: this.convertChampionIdToChampionModel(championId),
          spells: [
            this.convertSummonerSpellIdToSummonerSpellModel(spell1Id),
            this.convertSummonerSpellIdToSummonerSpellModel(spell2Id),
          ],
        };
      });
    const teamBlue = participants
      .filter((participant) => participant.teamId === 200)
      .map((participant) => {
        const { championId, spell1Id, spell2Id, ...rest } = participant;
        return {
          ...rest,
          champion: this.convertChampionIdToChampionModel(championId),
          spells: [
            this.convertSummonerSpellIdToSummonerSpellModel(spell1Id),
            this.convertSummonerSpellIdToSummonerSpellModel(spell2Id),
          ],
        };
      });

    return GetCurrentGameResponseDto.create({
      ...rest,
      teamRed,
      teamBlue,
    });
  }

  private convertChampionIdToChampionModel(championId: number): Model.Champion {
    const championJson = this.championJson;
    const assetBaseUrl = this.assetBaseUrl;

    const champion = Object.values(championJson.data).find(
      (champion) => champion.key === championId.toString(),
    );
    const championModel: Model.Champion = {
      id: champion.id,
      key: champion.key,
      name: champion.name,
      title: champion.title,
      image: {
        square: `${assetBaseUrl}/img/champion/${champion.image.full}`,
      },
    };

    return championModel;
  }

  private convertSummonerSpellIdToSummonerSpellModel(
    summonerSpellId: number,
  ): Model.SummonerSpell {
    const summonerSpellJson = this.summonerSpellJson;
    const assetBaseUrl = this.assetBaseUrl;

    const summonerSpell = Object.values(summonerSpellJson.data).find(
      (summonerSpell) => summonerSpell.key === summonerSpellId.toString(),
    );

    const spellModel: Model.SummonerSpell = {
      id: summonerSpell.id,
      name: summonerSpell.name,
      description: summonerSpell.description,
      key: summonerSpell.key,
      image: {
        square: `${assetBaseUrl}/img/spell/${summonerSpell.id}.png`,
      },
    };

    return spellModel;
  }
}
