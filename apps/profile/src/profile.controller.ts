import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileRequest } from './dto/update-profile.request';
import { updateInterestsRequest } from './dto/update-interests.request';
import { JwtAuthGuard } from '@app/common';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: any) {
    const data = await this.profileService.getProfile(req.user._id);
    return {
      message: 'Profile fetched successfully',
      statusCode: 200,
      data,
    };
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Body() request: UpdateProfileRequest, @Req() req: any) {
    const data = await this.profileService.updateProfile(request, req.user._id);
    return {
      message: 'Profile updated successfully',
      statusCode: 200,
      data,
    };
  }

  @Get(':username')
  @UseGuards(JwtAuthGuard)
  async getOtherProfile(@Param('username') username: string) {
    const data = await this.profileService.getOtherProfile(username);
    return {
      message: 'Profile fetched successfully',
      statusCode: 200,
      data,
    };
  }

  @Put('interests')
  @UseGuards(JwtAuthGuard)
  async updateInterests(
    @Body() request: updateInterestsRequest,
    @Req() req: any,
  ) {
    const data = await this.profileService.updateInterests(
      request,
      req.user._id,
    );
    return {
      message: 'Interests updated successfully',
      statusCode: 200,
      data,
    };
  }
}
