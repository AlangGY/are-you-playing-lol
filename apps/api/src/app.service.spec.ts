import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import {
  GetSummonerRequestDto,
  GetSummonerResponseDto,
} from './dto/get-summoner.dto';

describe('AppService', () => {
  let service: AppService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'RIOT_API_KEY':
          return 'test-api-key';
        case 'RIOT_API_ASIA_BASE_URL':
          return 'https://test-api.url';
        case 'RIOT_API_KR_BASE_URL':
          return 'https://test-api.url';
        default:
          return null;
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  describe('searchSummoner', () => {
    let fetchMock: jest.SpyInstance;

    beforeEach(() => {
      fetchMock = jest.spyOn(global, 'fetch').mockImplementation();
    });

    afterEach(() => {
      fetchMock.mockRestore();
    });

    it('소환사 정보를 성공적으로 검색해야 합니다', async () => {
      const mockResponse: GetSummonerResponseDto =
        GetSummonerResponseDto.create('test-puuid');

      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await service.searchSummoner(
        GetSummonerRequestDto.create('TestUser', 'KR1'),
      );

      expect(fetchMock).toHaveBeenCalledWith(
        'https://test-api.url/riot/account/v1/accounts/by-riot-id/TestUser/KR1',
        {
          headers: {
            'X-Riot-Token': 'test-api-key',
          },
        },
      );
      expect(result.puuid).toEqual(mockResponse.puuid);
    });

    it('API 호출 실패시 에러를 처리해야 합니다', async () => {
      fetchMock.mockRejectedValueOnce(new Error('API 호출 실패'));

      await expect(
        service.searchSummoner(GetSummonerRequestDto.create('TestUser', 'KR1')),
      ).rejects.toThrow('API 호출 실패');
    });
  });
});
