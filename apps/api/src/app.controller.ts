import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { GetSummonerRequestDto } from './dto/get-summoner.dto';
import { GetCurrentGameRequestDto } from './dto/get-current-game.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('summoner')
  async getSummoner(
    @Query('gameName') gameName: string,
    @Query('tagLine') tagLine: string,
  ) {
    const getSummonerRequestDto = GetSummonerRequestDto.create(
      gameName,
      tagLine,
    );
    return this.appService.searchSummoner(getSummonerRequestDto);
  }

  @Get('current-game')
  async getCurrentGame(@Query('puuid') puuid: string) {
    const getCurrentGameRequestDto = GetCurrentGameRequestDto.create(puuid);
    return this.appService.checkCurrentGame(getCurrentGameRequestDto);
  }
}
