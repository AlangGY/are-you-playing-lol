import { IsString, validate } from 'class-validator';

export class GetCurrentGameRequestDto {
  @IsString()
  puuid: string;

  static create(puuid: string) {
    const getCurrentGameRequestDto = new GetCurrentGameRequestDto();
    getCurrentGameRequestDto.puuid = puuid;
    validate(getCurrentGameRequestDto);
    return getCurrentGameRequestDto;
  }
}

export class GetCurrentGameResponseDto {
  @IsString()
  gameId: string;
}
