import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { CreateBookDto } from './dto/create-book.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('books')
@UseInterceptors(ResponseInterceptor)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body(new ValidationPipe()) book: CreateBookDto) {
    return this.booksService.create(book);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() book: CreateBookDto) {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
