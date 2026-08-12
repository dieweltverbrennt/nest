import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { CreateBookDto } from './dto/create-book.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@Controller('books')
@UseInterceptors(ResponseInterceptor)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Post()
  create(@Body(new ValidationPipe()) book: CreateBookDto) {
    return this.booksService.create(book);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() book: Book) {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
