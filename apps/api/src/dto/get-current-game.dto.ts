import { IsString, validate, validateSync } from 'class-validator';

export class GetCurrentGameRequestDto {
  @IsString()
  puuid: string;

  static create(puuid: string) {
    const getCurrentGameRequestDto = new GetCurrentGameRequestDto();
    getCurrentGameRequestDto.puuid = puuid;
    validateSync(getCurrentGameRequestDto);
    return getCurrentGameRequestDto;
  }
}

export class GetCurrentGameResponseDto {
  @IsString()
  gameId: string;
}
