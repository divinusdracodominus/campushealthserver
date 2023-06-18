import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { participants } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ExecutionContext } from '@nestjs/common';
import { Request } from '@nestjs/common';

//import { compareSync, genSaltSync, hashSync } from 'bcrypt-ts';

export enum AuthStatus {
  MissingUser,
  BadPassword,
  Succeeded,
}

export interface AuthResult {
  status: AuthStatus;
  message: string | null;
  user: participants | null;
}

@Injectable()
export class AuthService {
  constructor(private client: PrismaService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.validateRequest(request);
  }
  
  async validateRequest(request: Request): Promise<boolean> {
    if(request == undefined || request.headers == undefined) {
      console.log("authentication request failed because of missing value");
      return false;
  }
  let email: string = request.headers["email"];
  let participant_id = request.headers["id"];

  if(email == null || participant_id == null) {
    return false;
  }

  let id = request.headers;
  console.log("headers: " + JSON.stringify(request.headers));

  let authres: AuthResult = await this.verify_user({email: email, participant_id:participant_id });
  if(authres.user != null) {
      console.log("authentication request succeeded");
      return true;
  }
  return false;
  }

  async verify_user(userRequest: {email: string, participant_id: string}): Promise<AuthResult> {
    try {
      console.log("user with email: " + userRequest.email + " attempting to authenticate");
      const user: participants = await this.client.participants.findFirst({
        where: {
            email: userRequest.email
        },
      });

      if (userRequest.participant_id == user.id) {
        return {
          status: AuthStatus.Succeeded,
          message: "Ok",
          user: user,
        };
      } else {
        return {
          status: AuthStatus.BadPassword,
          message: "incorrect participant id",
          user: null,
        };
      }
    } catch (reason: any) {
      console.log('reason: ' + JSON.stringify(reason));
      return {
        status: AuthStatus.MissingUser,
        message: "missing user",
        user: null,
      };
    }
  }
}
