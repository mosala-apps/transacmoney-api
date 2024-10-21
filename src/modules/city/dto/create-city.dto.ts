import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCityDto {
    @ApiProperty()
    @Optional()
    @IsString()
    name:string
    
    @ApiProperty()
    @Optional()
    @IsString()
    code:string

}
