import { Module } from '@nestjs/common';
import { MushroomsController } from './mushrooms.controller';
import { MushroomsService } from './mushrooms.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MushroomsController],
  providers: [MushroomsService],
  exports: [MushroomsService],
})
export class MushroomsModule {}
