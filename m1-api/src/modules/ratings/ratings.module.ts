import { Module } from '@nestjs/common';
import { RatingsController } from './controllers/ratings.controller';

@Module({
  controllers: [RatingsController],
})
export class RatingsModule {}
