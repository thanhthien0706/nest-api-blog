import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from 'src/entity/user.entity';
import { SignUpDto } from 'src/common/form/signup.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async checkExistByEmail(email: string): Promise<boolean> {
    const checkUser = await this.userRepository.exist({
      where: { email },
    });

    return checkUser;
  }

  async createUser(signupData: SignUpDto): Promise<UserEntity> {
    const user = await this.userRepository.save(signupData);

    if (!user) {
      throw new ConflictException(`Not Create User`);
    }

    return user;
  }
}
