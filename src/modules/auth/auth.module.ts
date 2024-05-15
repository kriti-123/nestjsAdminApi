import { Module } from '@nestjs/common';
import { authController } from './auth.controller';
import { authService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '../admin/Entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [authController],
  providers: [authService],
  exports: [authModule],
})
export class authModule {}
