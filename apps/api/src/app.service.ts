import { Injectable } from '@nestjs/common';
import {
  GetCurrentGameRequestDto,
  GetCurrentGameResponseDto,
} from './dto/get-current-game.dto';
import { RiotService } from './riot/riot.service';
import {
  CurrentGameNotFoundException,
  SummonerNotFoundException,
} from './exceptions/exceptions';
import { Mapper } from './mapper/mapper';

@Injectable()
export class AppService {
  constructor(private riotService: RiotService) {}

  async checkCurrentGame({
    gameName,
    tagLine,
  }: GetCurrentGameRequestDto): Promise<GetCurrentGameResponseDto> {
    try {
      const summoner = await this.riotService.searchSummoner(gameName, tagLine);
      const currentGame = await this.riotService.checkCurrentGame(
        summoner.puuid,
      );

      return Mapper.SpectatorV5ResponseDtoToGetCurrentGameResponseDto(
        currentGame,
      );
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
