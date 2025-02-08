import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { RiotService } from './riot/riot.service';

describe('AppService', () => {
  let service: AppService;

  const mockRiotService: Partial<RiotService> = {
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
});
