import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}
    async canActivate(context: ExecutionContext) {
        console.log("🔴guard is working!");
        
        const req = context.switchToHttp().getRequest();
        const tokenHeader:string = req.headers.authorization; // 'Bearer <token>'
            console.log('🔴token header: ', tokenHeader);
        const [_bearder, token] = tokenHeader.split(' ');
        
        if(!token){
            console.log('no token');
            throw new UnauthorizedException();
        }
        
        try {
            const tokenPayload = await this.jwtService.verifyAsync(token);
                console.log("🔴 tokenPayload", tokenPayload);
            
            req.user = {email:tokenPayload.email}
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }

    }
}