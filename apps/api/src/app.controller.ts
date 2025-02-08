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

  @Get('current-game')
  async getCurrentGame(
    @Query('gameName') gameName: string,
    @Query('tagLine') tagLine: string,
  ) {
    const getCurrentGameRequestDto = GetCurrentGameRequestDto.create(
      gameName,
      tagLine,
    );
    return this.appService.checkCurrentGame(getCurrentGameRequestDto);
  }
}
