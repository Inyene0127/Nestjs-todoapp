import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuth } from './dto/user-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){};

    @Post('/signup')
    signUp(@Body(ValidationPipe) userAuth:UserAuth): Promise<void>{
        return this.authService.signUp(userAuth);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) userAuth:UserAuth): Promise<void>{
        return this.authService.signIn(userAuth);
    }




}
