import { Controller, Get } from '@nestjs/common';
@Controller('user')
export class userController {
  @Get()
  findalluser() {
    return 'this is the user side....';
  }
}
