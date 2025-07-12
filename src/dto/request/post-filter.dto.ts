import {
  IsOptional,
  IsNumber,
  IsString,
  Min,
  IsUUID,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FilterPostDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minSquare?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxSquare?: number;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  ward?: string;

  @IsOptional()
  @IsUUID()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  amenities?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
