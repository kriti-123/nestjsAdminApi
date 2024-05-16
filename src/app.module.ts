import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { indexModule } from './modules/index.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StaffsModule } from './modules/staffs/staffs.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs'),
    StaffsModule,
    indexModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
