import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsNumber()
  founded: number;
}

export class UpdateTeamDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsNumber()
  @IsOptional()
  founded: number;
}