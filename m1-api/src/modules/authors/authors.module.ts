import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsController } from './controllers/author.controller';
import { AuthorsService } from './services/author.service';
import { AuthorsRepository } from './repositories/authors.repository';
import { Author } from './models/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsRepository],
  exports: [AuthorsService],
})
export class AuthorsModule {}
