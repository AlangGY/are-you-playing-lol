import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RiotModule } from './riot/riot.module';
import { Mapper } from './mapper/mapper';
import { RiotService } from './riot/riot.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RiotModule,
  ],
  controllers: [AppController],
  providers: [AppService, Mapper],
})
export class AppModule {}
