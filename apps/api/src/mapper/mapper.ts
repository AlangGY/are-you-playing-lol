import type { Model } from '@are-you-playing-lol/common-interfaces';
import { GetCurrentGameResponseDto } from '../dto/get-current-game.dto';
import {
  ChampionJson,
  SpectatorV5ResponseDto,
  Summoner,
} from '../riot/riot.dto';
import { RiotService } from '../riot/riot.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Mapper {
  private initialized = false;
  private championJson: ChampionJson | null = null;
  private assetBaseUrl: string | null = null;

  constructor(private riotService: RiotService) {}

  async init() {
    if (this.initialized) {
      return;
    }
    const [championJson, assetBaseUrl] = await Promise.all([
      this.riotService.getChampionJson(),
      this.riotService.getAssetBaseUrl(),
    ]);
    this.championJson = championJson;
    this.assetBaseUrl = assetBaseUrl;
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
        const { championId, ...rest } = participant;
        return {
          ...rest,
          champion: this.convertChampionIdToChampionModel(championId),
        };
      });
    const teamBlue = participants
      .filter((participant) => participant.teamId === 200)
      .map((participant) => {
        const { championId, ...rest } = participant;
        return {
          ...rest,
          champion: this.convertChampionIdToChampionModel(championId),
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
}
