import { Test, TestingModule } from '@nestjs/testing';
import { RiotService } from './riot.service';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';

describe('RiotService', () => {
  let service: RiotService;
  let configService: ConfigService;
  const mockRiotApiKey = 'test-api-key';
  const mockRiotApiAsiaBaseUrl = 'https://asia.api.riotgames.com';
  const mockRiotApiKrBaseUrl = 'https://kr.api.riotgames.com';
  const mockLolDataDragonBaseUrl = 'https://ddragon.leagueoflegends.com';

  const mockConfigService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'RIOT_API_KEY':
          return mockRiotApiKey;
        case 'RIOT_API_ASIA_BASE_URL':
          return mockRiotApiAsiaBaseUrl;
        case 'RIOT_API_KR_BASE_URL':
          return mockRiotApiKrBaseUrl;
        case 'LOL_DATA_DRAGON_BASE_URL':
          return mockLolDataDragonBaseUrl;
        default:
          return undefined;
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RiotService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<RiotService>(RiotService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchSummoner', () => {
    const mockGameName = 'testUser';
    const mockTagLine = 'KR1';
    const mockPuuid = 'test-puuid';

    beforeEach(() => {
      global.fetch = jest.fn();
    });

    it('성공적으로 소환사를 검색해야 합니다', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ puuid: mockPuuid }),
      });

      const result = await service.searchSummoner(mockGameName, mockTagLine);

      expect(result.puuid).toBe(mockPuuid);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${mockGameName}/${mockTagLine}`,
        {
          headers: {
            'X-Riot-Token': mockRiotApiKey,
          },
        },
      );
    });

    it('소환사를 찾을 수 없을 때 NotFoundException을 던져야 합니다', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(
        service.searchSummoner(mockGameName, mockTagLine),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('checkCurrentGame', () => {
    const mockPuuid = 'test-puuid';
    const mockGameData = { gameId: '123456' };

    beforeEach(() => {
      global.fetch = jest.fn();
    });

    it('성공적으로 현재 게임을 조회해야 합니다', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGameData),
      });

      const result = await service.checkCurrentGame(mockPuuid);

      expect(result).toEqual(mockGameData);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://kr.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${mockPuuid}`,
        {
          headers: {
            'X-Riot-Token': mockRiotApiKey,
          },
        },
      );
    });

    it('현재 게임을 찾을 수 없을 때 NotFoundException을 던져야 합니다', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(service.checkCurrentGame(mockPuuid)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
