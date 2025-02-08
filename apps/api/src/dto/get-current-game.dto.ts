import { IsString, validate, validateSync } from 'class-validator';

export class GetCurrentGameRequestDto {
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

export class GetCurrentGameResponseDto {
  @IsString()
  gameId: string;
}
