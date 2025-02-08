import { GetCurrentGameResponseDto } from '../dto/get-current-game.dto';
import { SpectatorV5ResponseDto } from '../riot/riot.dto';

export class Mapper {
  static async SpectatorV5ResponseDtoToGetCurrentGameResponseDto(
    spectatorV5ResponseDto: SpectatorV5ResponseDto,
  ): Promise<GetCurrentGameResponseDto> {
    const teamRed = spectatorV5ResponseDto.participants.filter(
      (participant) => participant.teamId === 100,
    );
    const teamBlue = spectatorV5ResponseDto.participants.filter(
      (participant) => participant.teamId === 200,
    );

    return GetCurrentGameResponseDto.create({
      ...spectatorV5ResponseDto,
      teamRed,
      teamBlue,
    });
  }
}
