import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class ProfileRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(ProfileRepository.name);

  constructor(
    @InjectModel(User.name) profileModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(profileModel, connection);
  }
}
