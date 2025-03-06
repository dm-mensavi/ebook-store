import { Module } from '@nestjs/common';
import { AuthorsService } from './author.service';
import { AuthorsController } from './author.controller';

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
