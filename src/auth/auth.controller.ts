import { Body, Controller, Post } from '@nestjs/common';
import { participants } from '@prisma/client';
import { AuthService } from './auth.service';
//import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post("/signup")
  async createUser(@Body() data: participants) {
    return "Hello World";
  }
  @Post("/login")
  async login(@Body() data: {email: string, participant_id: string}) {
    return this.auth.verify_user(data);
  }

}
