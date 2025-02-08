import { Injectable } from '@nestjs/common';
import { GetCurrentGameRequestDto } from './dto/get-current-game.dto';
import { RiotService } from './riot/riot.service';
import {
  CurrentGameNotFoundException,
  SummonerNotFoundException,
} from './exceptions/exceptions';

@Injectable()
export class AppService {
  constructor(private riotService: RiotService) {}

  async checkCurrentGame({ gameName, tagLine }: GetCurrentGameRequestDto) {
    try {
      const summoner = await this.riotService.searchSummoner(gameName, tagLine);
      const currentGame = await this.riotService.checkCurrentGame(
        summoner.puuid,
      );
      return currentGame;
    } catch (error) {
      if (error instanceof SummonerNotFoundException) {
        throw error;
      }
      if (error instanceof CurrentGameNotFoundException) {
        throw CurrentGameNotFoundException.createByNameAndTag(
          gameName,
          tagLine,
        );
      }
      throw error;
    }
  }
}
