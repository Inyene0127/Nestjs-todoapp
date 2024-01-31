import { DataSource, EntityRepository, Repository } from "typeorm";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { User } from "./user.entity";
import { UserAuth } from "./dto/user-auth.dto";
import { ErrorEnum } from "src/enum/error.enum";


@Injectable()
// @EntityRepository(User)
export class UserRepository extends Repository<User>{
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
      }
    
    async signUp(userAuth:UserAuth): Promise<void>{
        const {username, password} = userAuth;
        
        
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        
        try{
            await user.save();   
        }catch(error){
            if (error.code === ErrorEnum.DUPLICATE){
                throw new ConflictException('username already exists');
            } else{
                throw new InternalServerErrorException();
            }
        }   
    }
    async validateUserPassword(userAuth:UserAuth): Promise<string>{
        const {username, password} = userAuth;
        const user = await this.findOneBy({ username });
        
        if(user && await user.validatePassword(password)){
            return user.username;
        }else{
            return null;
        }
    }
    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }
}