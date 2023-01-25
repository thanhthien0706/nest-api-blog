import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from 'src/entity/user.entity';
import { SignUpDto } from 'src/common/dto/Signup.dto';
import { UserDto } from 'src/common/dto/user.dto';
import { UserConvert } from './user.convert';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userConvert: UserConvert,
  ) {}

  async checkExistByEmail(email: string): Promise<boolean> {
    const checkUser = await this.userRepository.existByEmail(email);

    return checkUser;
  }

  async createUser(signupData: SignUpDto): Promise<UserDto> {
    const user = await this.userRepository.save(signupData);

    if (!user) {
      throw new ConflictException(`Not Create User`);
    }

    return this.userConvert.toDto(user);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ConflictException(`User ${email} does not exist`);
    }

    return user;
  }
}
