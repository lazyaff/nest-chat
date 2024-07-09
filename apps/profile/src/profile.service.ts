import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { UpdateProfileRequest } from './dto/update-profile.request';
import { zodiacRanges } from './constant/zodiac';
import { horoscopeSigns } from './constant/horoscope';
import { updateInterestsRequest } from './dto/update-interests.request';

@Injectable()
export class ProfileService {
  constructor(private readonly ProfileRepository: ProfileRepository) {}

  async getProfile(id: string) {
    const data = await this.ProfileRepository.findOne({ _id: id });

    if (!data) {
      throw new NotFoundException('Profile not found');
    }

    return this.dataParser(data);
  }

  async getOtherProfile(username: string) {
    const data = await this.ProfileRepository.findOne({ username: username });

    if (!data) {
      throw new NotFoundException('Profile not found');
    }

    return this.dataParser(data);
  }

  async updateProfile(request: UpdateProfileRequest, id: string) {
    const data = await this.ProfileRepository.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          name: request.name,
          photo_url: request.photo_url,
          gender: request.gender,
          birthday: new Date(request.birthday),
          height: request.height,
          weight: request.weight,
          horoscope: this.horoscope(new Date(request.birthday)),
          zodiac: this.zoduac(new Date(request.birthday)),
        },
      },
    );

    if (!data) {
      throw new NotFoundException('Profile not found');
    }

    return this.dataParser(data);
  }

  async updateInterests(request: updateInterestsRequest, id: string) {
    const data = await this.ProfileRepository.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          interests: request.interests,
        },
      },
    );

    if (!data) {
      throw new NotFoundException('Profile not found');
    }

    return this.dataParser(data);
  }

  private dataParser(data: any) {
    return {
      username: data.username,
      name: data.name || '',
      photo_url: data.photo_url || '',
      gender: data.gender || '',
      birthday: data.birthday ? this.dateToString(data.birthday) : '',
      age: data.birthday
        ? new Date().getFullYear() - data.birthday.getFullYear()
        : '',
      height: data.height
        ? {
            value: data.height.value,
            unit: data.height.unit,
          }
        : {},
      weight: data.weight
        ? {
            value: data.weight.value,
            unit: data.weight.unit,
          }
        : {},
      horoscope: data.horoscope || '',
      zodiac: data.zodiac || '',
      interests: data.interests || [],
    };
  }

  private dateToString(date: Date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  private horoscope(date: Date): string {
    const horoscopeRanges = horoscopeSigns(date);
    return this.checkDate(date, horoscopeRanges);
  }

  private zoduac(date: Date): string {
    return this.checkDate(date, zodiacRanges);
  }

  private checkDate(
    date: Date,
    range: { start: Date; end: Date; sign: string }[],
  ) {
    for (const item of range) {
      if (date >= item.start && date <= item.end) {
        return item.sign;
      }
    }

    return 'Unknown';
  }
}
