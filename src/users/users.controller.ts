import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ConflictException, NotFoundException, UnauthorizedException, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { BaseUserDto } from './dto/base.user.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequestWithUser } from './dto/req-w-user.dto';
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, 
    private readonly configService: ConfigService, 
    private readonly authService: AuthService
  ) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authService.signUp(createUserDto);
    } catch (error) {
      throw new ConflictException(error?.message);
    }
  }

  @Post('log-in')
  async logIn(@Body() credentials: BaseUserDto){
    try {
      return this.authService.signIn(credentials);
    } catch (error) {
      throw new UnauthorizedException('invalid credentials');
    }
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async findAll(@Req() req: RequestWithUser) {

    const userEmail = req.user.email;
    return this.usersService.findAll(userEmail);
  }

  @UseGuards(AuthGuard)
  @Get('my-profile')
  async getProfile(@Req() req: RequestWithUser) {
    console.log("🔴 from req after gurad: ", req.user);
    const userEmail = req.user.email;
    const userProfile = await this.usersService.findOne(userEmail)
      console.log("🔴 userProfile: ", userProfile);
    
    return {email:userProfile?.email, fullName: userProfile?.fullName, age:userProfile?.age}
  }

}

