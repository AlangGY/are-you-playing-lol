import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { RiotService } from './riot/riot.service';
import { CURRENT_GAME_RESPONSE_MOCK } from './__mocks__/current-game-response.mock';
import { RIOT_SPECTATOR_RESPONSE_MOCK } from './__mocks__/riot-spectator-response.mock';

describe('AppService', () => {
  let service: AppService;

  const mockRiotService: jest.Mocked<Partial<RiotService>> = {
    searchSummoner: jest.fn(),
    checkCurrentGame: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: RiotService,
          useValue: mockRiotService,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search current game', () => {
    it('소환사의 gameName과 tagLine을 받아 현재 게임을 찾을 수 있어야 한다.', async () => {
      const mockGameName = 'test-gameName';
      const mockTagLine = 'test-tagLine';
      mockRiotService.searchSummoner.mockResolvedValue({
        puuid: 'test-puuid',
      });

      mockRiotService.checkCurrentGame.mockResolvedValue(
        RIOT_SPECTATOR_RESPONSE_MOCK,
      );
      const result = await service.checkCurrentGame({
        gameName: mockGameName,
        tagLine: mockTagLine,
      });

      expect(result).toEqual(CURRENT_GAME_RESPONSE_MOCK);
    });
  });
});
