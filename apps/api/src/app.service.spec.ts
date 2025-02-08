import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { RiotService } from './riot/riot.service';

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
      const mockCurrentGame = {
        gameId: 1234567890,
        mapId: 1234567890,
        gameMode: 'test-gameMode',
        gameType: 'test-gameType',
        gameQueueConfigId: 1234567890,
        participants: [],
        observers: {
          encryptionKey: 'test-encryptionKey',
        },
        platformId: 'test-platformId',
        bannedChampions: [],
        gameStartTime: 1234567890,
        gameLength: 1234567890,
      };

      mockRiotService.searchSummoner.mockResolvedValue({
        puuid: 'test-puuid',
      });

      mockRiotService.checkCurrentGame.mockResolvedValue(mockCurrentGame);
      const result = await service.checkCurrentGame({
        gameName: mockGameName,
        tagLine: mockTagLine,
      });

      expect(result).toEqual(mockCurrentGame);
    });
  });
});
