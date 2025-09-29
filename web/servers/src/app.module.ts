import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NodesModule } from './nodes/nodes.module';
import { CamerasModule } from './cameras/cameras.module';
import { MushroomsModule } from './mushrooms/mushrooms.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    NodesModule,
    CamerasModule,
    MushroomsModule,
  ],
})
export class AppModule {}
