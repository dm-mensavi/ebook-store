import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  describe('getHello()', () => {
    it('should return welcome message', () => {
      expect(service.getHello()).toBe(
        'Welcome to the Library Book Management System API!',
      );
    });
  });
});
