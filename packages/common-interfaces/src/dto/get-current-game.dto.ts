import { GameInfo } from "../model/game-info";

export interface GetCurrentGameRequestDto {
  gameName: string;
  tagLine: string;
}

export interface GetCurrentGameResponseDto extends GameInfo {}
