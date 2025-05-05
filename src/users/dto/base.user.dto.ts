
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class BaseUserDto {
    @ApiProperty({example: "akira@nest.dev"})
    @IsEmail()
    email: string;

    @ApiProperty({example:"1111"})
    @IsNotEmpty()
    @Length(8)
    password: string;
}
