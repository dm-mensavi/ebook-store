import { Module } from '@nestjs/common';
import { AuthorsService } from './services/author.service';
import { AuthorsController } from './controllers/author.controller';

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
