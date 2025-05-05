import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { BaseUserDto } from "./dto/base.user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async signUp(createUserDto: CreateUserDto) {
        let user = await this.usersService.findOne(createUserDto.email);
        console.log("# user: ", user);
        
        if(user){
            throw new ConflictException('this email already exits')
        }
        else{
            const hashedPassword = await bcrypt.hash(createUserDto.password,10);
            createUserDto.password = hashedPassword;
            user = await this.usersService.create(createUserDto);
        }

        return 'successful signup';
    }

    async signIn(credentials: BaseUserDto) {
        let user = await this.usersService.findOne(credentials.email);
        console.log("# found user of this email: ", user);
    
        if(user){
            const match = await bcrypt.compare(credentials.password, user.password);
            if(match) {
                //! sent token
                const payload ={ 
                    email: user.email,
                    name: user.fullName
                }

                console.log("# payload: ", payload);
                
                const accessToken = await this.jwtService.signAsync(payload);
                console.log("🔴 accessToken: ", accessToken);

                return { accessToken, use_email:user.email};
            }
        }
        throw new UnauthorizedException('invalid credentials');
    }
}

