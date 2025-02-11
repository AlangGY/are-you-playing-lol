import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetSummonerResponseDto } from '../dto/get-summoner.dto';
import {
  CurrentGameNotFoundException,
  SummonerNotFoundException,
} from '../exceptions/exceptions';
import {
  ChampionJson,
  RunesReforgedJson,
  SpectatorV5ResponseDto,
  SummonerSpellJson,
} from './riot.dto';

@Injectable()
export class RiotService {
  private riotApiAsiaBaseUrl: string;
  private riotApiKrBaseUrl: string;
  private lolDataDragonBaseUrl: string;
  private riotApiKey: string;
  private locale = 'ko_KR';

  constructor(private configService: ConfigService) {
    this.riotApiKey = this.configService.get('RIOT_API_KEY');
    this.riotApiAsiaBaseUrl = this.configService.get('RIOT_API_ASIA_BASE_URL');
    this.riotApiKrBaseUrl = this.configService.get('RIOT_API_KR_BASE_URL');
    this.lolDataDragonBaseUrl = this.configService.get(
      'LOL_DATA_DRAGON_BASE_URL',
    );
  }

  async searchSummoner(gameName: string, tagLine: string) {
    try {
      const response = await fetch(
        `${this.riotApiAsiaBaseUrl}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
        {
          headers: {
            'X-Riot-Token': this.riotApiKey,
          },
        },
      );

      if (!response.ok) {
        throw new SummonerNotFoundException(gameName, tagLine);
      }

      const data = await response.json();
      return GetSummonerResponseDto.create(data.puuid);
    } catch (error) {
      Logger.debug(error);
      throw error;
    }
  }

  async checkCurrentGame(puuid: string): Promise<SpectatorV5ResponseDto> {
    try {
      const response = await fetch(
        `${this.riotApiKrBaseUrl}/lol/spectator/v5/active-games/by-summoner/${puuid}`,
        {
          headers: {
            'X-Riot-Token': this.riotApiKey,
          },
        },
      );

      if (!response.ok) {
        throw CurrentGameNotFoundException.createByPuuid(puuid);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      Logger.debug(error);
      throw error;
    }
  }

  async getAssetBaseUrl() {
    return `${this.lolDataDragonBaseUrl}/cdn`;
  }

  // TODO: 캐시 처리
  async getAssetVersionedBaseUrl() {
    const assetBaseUrl = await this.getAssetBaseUrl();
    const latestVersion = await this.getLatestVersion();

    return `${assetBaseUrl}/${latestVersion}`;
  }

  // TODO: 캐시 처리
  private async getLatestVersion() {
    const versionResponse = await fetch(
      `${this.lolDataDragonBaseUrl}/api/versions.json`,
    );
    const data = await versionResponse.json();
    return data[0];
  }

  // TODO: 캐시 처리
  async getChampionJson(): Promise<ChampionJson> {
    const assetVersionedBaseUrl = await this.getAssetVersionedBaseUrl();
    const response = await fetch(
      `${assetVersionedBaseUrl}/data/${this.locale}/champion.json`,
    );
    const data = await response.json();
    return data;
  }

  // TODO: 캐시 처리
  async getSummonerSpellJson(): Promise<SummonerSpellJson> {
    const assetVersionedBaseUrl = await this.getAssetVersionedBaseUrl();
    const response = await fetch(
      `${assetVersionedBaseUrl}/data/${this.locale}/summoner.json`,
    );
    const data = await response.json();
    return data;
  }

  // TODO: 캐시 처리
  async getRunesReforgedJson(): Promise<RunesReforgedJson> {
    const assetVersionedBaseUrl = await this.getAssetVersionedBaseUrl();
    const response = await fetch(
      `${assetVersionedBaseUrl}/data/${this.locale}/runesReforged.json`,
    );
    const data = await response.json();
    return data;
  }
}
