
import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from './base.user.dto';
import { IsAlpha, IsNumber, Matches, Max, MAX, Min } from 'class-validator';

export class UserDto extends BaseUserDto {

    @ApiProperty({example:"Akai Nesty"})
    @IsAlpha()
    fullName: string;

    @ApiProperty({example:50})
    @IsNumber()
    @Min(16)
    @Max(60)
    age: number;

    @ApiProperty({example:"+20113334444"})
    @Matches(/^01\d{9}$/, { message: 'mobileNumber must start with 01 and be 11 digits' })
    mobileNumber: string;
}

