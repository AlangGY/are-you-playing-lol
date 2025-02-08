import { IsString, validateSync } from 'class-validator';

export class GetSummonerRequestDto {
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

export class GetSummonerResponseDto {
  @IsString()
  puuid: string;

  static create(puuid: string) {
    const getSummonerResponseDto = new GetSummonerResponseDto();
    getSummonerResponseDto.puuid = puuid;
    validateSync(getSummonerResponseDto);
    return getSummonerResponseDto;
  }
}
