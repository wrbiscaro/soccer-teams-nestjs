import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamModule } from './team/team.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TeamModule],
})
export class AppModule {}
