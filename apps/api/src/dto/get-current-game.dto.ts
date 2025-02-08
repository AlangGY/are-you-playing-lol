import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  validateSync,
} from 'class-validator';
import type { Dto, Model } from '@are-you-playing-lol/common-interfaces';
export class GetCurrentGameRequestDto implements Dto.GetCurrentGameRequestDto {
  @IsString()
  gameName: string;

  @IsString()
  tagLine: string;

  static create(gameName: string, tagLine: string) {
    const getCurrentGameRequestDto = new GetCurrentGameRequestDto();
    getCurrentGameRequestDto.gameName = gameName;
    getCurrentGameRequestDto.tagLine = tagLine;
    validateSync(getCurrentGameRequestDto);
    return getCurrentGameRequestDto;
  }
}

export class GetCurrentGameResponseDto
  implements Dto.GetCurrentGameResponseDto
{
  @IsNumber()
  gameId: number;

  @IsString()
  gameType: string;

  @IsNumber()
  mapId: number;

  @IsString()
  gameMode: string;

  @IsArray()
  bannedChampions: Model.BannedChampion[];

  @IsNumber()
  gameLength: number;

  @IsNumber()
  gameQueueConfigId: number;

  @IsArray()
  teamBlue: Model.Summoner[];

  @IsArray()
  teamRed: Model.Summoner[];

  @IsObject()
  observers: Model.Observer;

  @IsString()
  platformId: string;

  @IsNumber()
  gameStartTime: number;

  static create(gameInfo: Model.GameInfo) {
    const getCurrentGameResponseDto = new GetCurrentGameResponseDto();
    getCurrentGameResponseDto.gameId = gameInfo.gameId;
    getCurrentGameResponseDto.gameType = gameInfo.gameType;
    getCurrentGameResponseDto.mapId = gameInfo.mapId;
    getCurrentGameResponseDto.gameMode = gameInfo.gameMode;
    getCurrentGameResponseDto.bannedChampions = gameInfo.bannedChampions;
    getCurrentGameResponseDto.gameLength = gameInfo.gameLength;
    getCurrentGameResponseDto.gameQueueConfigId = gameInfo.gameQueueConfigId;
    getCurrentGameResponseDto.teamBlue = gameInfo.teamBlue;
    getCurrentGameResponseDto.teamRed = gameInfo.teamRed;
    getCurrentGameResponseDto.observers = gameInfo.observers;
    getCurrentGameResponseDto.platformId = gameInfo.platformId;
    getCurrentGameResponseDto.gameStartTime = gameInfo.gameStartTime;
    validateSync(getCurrentGameResponseDto);
    return getCurrentGameResponseDto;
  }
}
