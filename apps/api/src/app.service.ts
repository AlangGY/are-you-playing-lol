import { Injectable } from '@nestjs/common';
import { GetSummonerRequestDto } from './dto/get-summoner.dto';
import { GetCurrentGameRequestDto } from './dto/get-current-game.dto';
import { RiotService } from './riot/riot.service';

@Injectable()
export class AppService {
  constructor(private riotService: RiotService) {}

  async searchSummoner({ gameName, tagLine }: GetSummonerRequestDto) {
    return this.riotService.searchSummoner(gameName, tagLine);
  }

  async checkCurrentGame({ puuid }: GetCurrentGameRequestDto) {
    return this.riotService.checkCurrentGame(puuid);
  }
}
