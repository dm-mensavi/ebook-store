import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  describe('getHello()', () => {
    it('should return welcome message', () => {
      const result = 'Welcome to the Library Book Management System API!';
      jest.spyOn(appService, 'getHello').mockReturnValue(result);

      expect(appController.getHello()).toBe(result);
    });
  });
});
