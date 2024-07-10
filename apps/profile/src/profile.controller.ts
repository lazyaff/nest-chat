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
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetProfileResponse } from './responses/get-profile.response';
import { UpdateProfileResponse } from './responses/update-profile.response';
import { UpdateInterestsResponse } from './responses/update-interests.response';

@Controller('profile')
@ApiTags('Main')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({
    summary: 'Get user logged in profile',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Profile fetched successfully',
    type: GetProfileResponse,
  })
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
  @ApiOperation({
    summary: 'Update user profile',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Profile updated successfully',
    type: UpdateProfileResponse,
  })
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
  @ApiOperation({
    summary: 'Get another user profile',
  })
  @ApiCookieAuth()
  @ApiParam({
    name: 'username',
    example: 'userone',
  })
  @ApiOkResponse({
    description: 'Profile fetched successfully',
    type: GetProfileResponse,
  })
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
  @ApiOperation({
    summary: 'Update user interests',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Interests updated successfully',
    type: UpdateInterestsResponse,
  })
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
