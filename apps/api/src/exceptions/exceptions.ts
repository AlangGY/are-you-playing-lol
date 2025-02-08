import { NotFoundException } from '@nestjs/common';

export class SummonerNotFoundException extends NotFoundException {
  constructor(name: string, tag: string) {
    super(`summoner ${name}#${tag} not found`);
  }
}

export class CurrentGameNotFoundException extends NotFoundException {
  private constructor(message: string) {
    super(message);
  }

  static createByPuuid(puuid: string) {
    return new CurrentGameNotFoundException(
      `current game of puuid:${puuid} not found`,
    );
  }

  static createByNameAndTag(name: string, tag: string) {
    return new CurrentGameNotFoundException(
      `current game of ${name}#${tag} not found`,
    );
  }
}
