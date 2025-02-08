import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetSummonerResponseDto } from '../dto/get-summoner.dto';
import {
  CurrentGameNotFoundException,
  SummonerNotFoundException,
} from '../exceptions/exceptions';

@Injectable()
export class RiotService {
  private riotApiAsiaBaseUrl: string;
  private riotApiKrBaseUrl: string;
  private lolDataDragonBaseUrl: string;
  private riotApiKey: string;

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

  async checkCurrentGame(puuid: string) {
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

  // 이후 사용
  private async getAssetBaseUrl() {
    const latestVersion = await this.getLatestVersion();

    return `${this.lolDataDragonBaseUrl}/cdn/${latestVersion}/data/ko_KR`;
  }

  // 이후 사용
  private async getLatestVersion() {
    const versionResponse = await fetch(
      `${this.lolDataDragonBaseUrl}/api/versions.json`,
    );
    const data = await versionResponse.json();
    return data[0];
  }
}
