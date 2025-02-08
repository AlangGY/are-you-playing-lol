import { Dto } from '@are-you-playing-lol/common-interfaces';
import { IsString, validateSync } from 'class-validator';

export class GetSummonerRequestDto implements Dto.GetSummonerRequestDto {
  @IsString()
  gameName: string;

  @IsString()
  tagLine: string;

  static create(gameName: string, tagLine: string) {
    const getSummonerRequestDto = new GetSummonerRequestDto();
    getSummonerRequestDto.gameName = gameName;
    getSummonerRequestDto.tagLine = tagLine;
    validateSync(getSummonerRequestDto);
    return getSummonerRequestDto;
  }
}

export class GetSummonerResponseDto implements Dto.GetSummonerResponseDto {
  @IsString()
  puuid: string;

  static create(puuid: string) {
    const getSummonerResponseDto = new GetSummonerResponseDto();
    getSummonerResponseDto.puuid = puuid;
    validateSync(getSummonerResponseDto);
    return getSummonerResponseDto;
  }
}
