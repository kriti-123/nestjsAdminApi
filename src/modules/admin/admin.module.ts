// import { Module } from '@nestjs/common';
// import { adminController } from './admin.controller';
// import { adminService } from './admin.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { model, models } from 'mongoose';
// import { Admin, AdminSchema } from './Entities/admin.entity';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './Entities/admin.entity';
import { adminController } from './admin.controller';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
//   ],
//   controllers: [adminController],
//   providers: [adminService],
//   exports: [adminService],
// })
// export class adminModule {}
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [adminController],
  exports: [adminModule],
})
export class adminModule {}
