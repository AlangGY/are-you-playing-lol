import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetSummonerRequestDto,
  GetSummonerResponseDto,
} from './dto/get-summoner.dto';
import { GetCurrentGameRequestDto } from './dto/get-current-game.dto';

@Injectable()
export class AppService {
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

  async searchSummoner(getSummonerRequestDto: GetSummonerRequestDto) {
    try {
      const response = await fetch(
        `${this.riotApiAsiaBaseUrl}/riot/account/v1/accounts/by-riot-id/${getSummonerRequestDto.gameName}/${getSummonerRequestDto.tagLine}`,
        {
          headers: {
            'X-Riot-Token': this.riotApiKey,
          },
        },
      );

      const data = await response.json();
      return GetSummonerResponseDto.create(data.puuid);
    } catch (error) {
      Logger.debug(error);
      throw error;
    }
  }

  async checkCurrentGame(getCurrentGameRequestDto: GetCurrentGameRequestDto) {
    try {
      const response = await fetch(
        `${this.riotApiKrBaseUrl}/lol/spectator/v5/active-games/by-summoner/${getCurrentGameRequestDto.puuid}`,
        {
          headers: {
            'X-Riot-Token': this.riotApiKey,
          },
        },
      );

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
