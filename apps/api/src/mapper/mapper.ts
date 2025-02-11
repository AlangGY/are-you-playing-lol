import type { Model } from '@are-you-playing-lol/common-interfaces';
import { GetCurrentGameResponseDto } from '../dto/get-current-game.dto';
import {
  ChampionJson,
  Perks,
  RunesReforgedJson,
  SpectatorV5ResponseDto,
  Summoner,
  SummonerSpellJson,
} from '../riot/riot.dto';
import { RiotService } from '../riot/riot.service';
import { Injectable, Logger } from '@nestjs/common';
import {
  ChampionNotFoundException,
  PerkNotFoundException,
  SummonerSpellNotFoundException,
} from '../exceptions/exceptions';

@Injectable()
export class Mapper {
  private initialized = false;
  private championJson: ChampionJson | null = null;
  private summonerSpellJson: SummonerSpellJson | null = null;
  private runesReforgedJson: RunesReforgedJson | null = null;
  private assetBaseUrl: string | null = null;
  private assetVersionedBaseUrl: string | null = null;
  constructor(private riotService: RiotService) {}

  async init() {
    try {
      if (this.initialized) {
        return;
      }
      const [
        championJson,
        assetBaseUrl,
        assetVersionedBaseUrl,
        summonerSpellJson,
        runesReforgedJson,
      ] = await Promise.all([
        this.riotService.getChampionJson(),
        this.riotService.getAssetBaseUrl(),
        this.riotService.getAssetVersionedBaseUrl(),
        this.riotService.getSummonerSpellJson(),
        this.riotService.getRunesReforgedJson(),
      ]);
      this.championJson = championJson;
      this.assetBaseUrl = assetBaseUrl;
      this.assetVersionedBaseUrl = assetVersionedBaseUrl;
      this.summonerSpellJson = summonerSpellJson;
      this.runesReforgedJson = runesReforgedJson;
      this.initialized = true;
    } catch (error) {
      Logger.error(error);
      this.initialized = false;
      throw error;
    }
  }

  async SpectatorV5ResponseDtoToGetCurrentGameResponseDto(
    spectatorV5ResponseDto: SpectatorV5ResponseDto,
  ): Promise<GetCurrentGameResponseDto> {
    await this.init();

    const { participants, ...rest } = spectatorV5ResponseDto;

    const teamRed = participants
      .filter((participant) => participant.teamId === 100)
      .map((participant) => this.convertSummonerToSummonerModel(participant));
    const teamBlue = participants
      .filter((participant) => participant.teamId === 200)
      .map((participant) => this.convertSummonerToSummonerModel(participant));

    return GetCurrentGameResponseDto.create({
      ...rest,
      teamRed,
      teamBlue,
    });
  }

  private convertSummonerToSummonerModel(summoner: Summoner): Model.Summoner {
    const { championId, spell1Id, spell2Id, ...rest } = summoner;
    return {
      ...rest,
      champion: this.convertChampionIdToChampionModel(championId),
      spells: [
        this.convertSummonerSpellIdToSummonerSpellModel(spell1Id),
        this.convertSummonerSpellIdToSummonerSpellModel(spell2Id),
      ],
      perks: this.convertPerksToPerksModel(summoner.perks),
    };
  }

  private convertChampionIdToChampionModel(championId: number): Model.Champion {
    const championJson = this.championJson;
    const assetBaseUrl = this.assetVersionedBaseUrl;

    const champion = Object.values(championJson.data).find(
      (champion) => champion.key === championId.toString(),
    );

    if (!champion) {
      throw new ChampionNotFoundException(championId);
    }

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
    const assetBaseUrl = this.assetVersionedBaseUrl;

    const summonerSpell = Object.values(summonerSpellJson.data).find(
      (summonerSpell) => summonerSpell.key === summonerSpellId.toString(),
    );

    if (!summonerSpell) {
      throw new SummonerSpellNotFoundException(summonerSpellId);
    }

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

  private convertPerksToPerksModel(perks: Perks): Model.Perks {
    const runesReforgedJson = this.runesReforgedJson;
    const assetBaseUrl = this.assetBaseUrl;

    const perkStyle = runesReforgedJson.find(
      (perk) => perk.id === perks.perkStyle,
    );

    const perkSubStyle = runesReforgedJson.find(
      (perk) => perk.id === perks.perkSubStyle,
    );

    if (!perkStyle) {
      throw new PerkNotFoundException(perks.perkStyle);
    }

    if (!perkSubStyle) {
      throw new PerkNotFoundException(perks.perkSubStyle);
    }

    const perkModel: Model.Perk = {
      id: perkStyle.id,
      name: perkStyle.name,
      image: {
        square: `${assetBaseUrl}/img/${perkStyle.icon}`,
      },
    };

    const perkSubModel: Model.Perk = {
      id: perkSubStyle.id,
      name: perkSubStyle.name,
      image: {
        square: `${assetBaseUrl}/img/${perkSubStyle.icon}`,
      },
    };

    return {
      perkIds: perks.perkIds,
      perkStyle: perkModel,
      perkSubStyle: perkSubModel,
    };
  }
}
