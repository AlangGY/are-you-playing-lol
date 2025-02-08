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
        gameId: 'test-gameId',
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
