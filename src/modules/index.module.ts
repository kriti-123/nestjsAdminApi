// import { Module } from '@nestjs/common';
// import { userModule } from './user/user.module';
// import { adminModule } from './admin/admin.module';
// import { authModule } from './auth/auth.module';
// @Module({
//   imports: [userModule, adminModule, authModule],
//   controllers: [],
//   providers: [],
// })

import { Module } from '@nestjs/common';
import { authModule } from './auth/auth.module';
import { adminModule } from './admin/admin.module';
import { StaffsModule } from './staffs/staffs.module';
@Module({
  imports: [authModule, adminModule, StaffsModule],
  exports: [],
  providers: [],
})
export class indexModule {}
