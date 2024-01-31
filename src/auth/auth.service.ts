import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from './dto/user-auth.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
      ) {}

   async signUp(userAuth:UserAuth): Promise<void>{
    return this.userRepository.signUp(userAuth);
   }  
   
   async signIn(userAuth:UserAuth){
        const result = await this.userRepository.validateUserPassword(userAuth);
        
        if(!result){
            throw new UnauthorizedException('Invalid credentials');
        }
   }
}
