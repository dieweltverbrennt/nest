import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  authors: string;

  @IsString()
  description: string;

  @IsString()
  favorite: string;

  @IsString()
  fileCover: string;

  @IsString()
  fileName: string;

  @IsString()
  fileBook: string;
}
